import { Redis } from 'ioredis'

import { SocketBus } from '@backend/online-status/socket-bus'
import { SocketBusService } from '@backend/online-status/socket-bus.service'

import { IUserStatusResponse, OnlineStatusEvent } from '@libs/api'

const MAX_IDLE_SEC = 60 * 60

export class OnlineStatus {
  username: string
  statusChangeBus: SocketBus

  constructor(username: string, socketBusService: SocketBusService, private readonly redis: Redis) {
    this.username = username
    this.statusChangeBus = socketBusService.getSocketBus(this.getRedisKey())
  }

  async isOnline(): Promise<boolean> {
    const numActive = parseInt((await this.redis.get(this.getRedisKey())) || '0')
    await this.redis.expire(this.getRedisKey(), MAX_IDLE_SEC)
    return numActive > 0
  }

  async incrementActiveSession() {
    const numActive = await this.redis.incr(this.getRedisKey())
    await this.redis.expire(this.getRedisKey(), MAX_IDLE_SEC)
    if (numActive == 1) await this.notifyStatusChanged()
  }

  async decrementActiveSession() {
    const numActive = await this.redis.decr(this.getRedisKey())
    if (numActive == 0) await this.notifyStatusChanged()
  }

  private getRedisKey() {
    return `online-status:${this.username}`
  }

  private async notifyStatusChanged() {
    await this.statusChangeBus.broadcastEvent(OnlineStatusEvent.STATUS_CHANGED, {
      username: this.username,
      online: await this.isOnline(),
    } as IUserStatusResponse)
  }
}
