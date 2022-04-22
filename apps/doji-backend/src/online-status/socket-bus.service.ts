import { Inject, Injectable, Logger } from '@nestjs/common'
import { logging } from 'googleapis/build/src/apis/logging'
import { Redis } from 'ioredis'
import { Socket } from 'socket.io'

import { SocketBus } from '@backend/online-status/socket-bus'
import { SocketBusClientContext } from '@backend/online-status/socket-bus-client-context'
import { BusMessage } from '@backend/online-status/socket-bus.dto'

const BUS_KEY = 'bus'

@Injectable()
export class SocketBusService {
  private logger = new Logger('SocketBusService')
  private busMap = new Map<string, SocketBus>()

  constructor(
    @Inject('RedisSubscriber') private readonly redisS: Redis,
    @Inject('Redis') private readonly redis: Redis,
  ) {
    redisS
      .subscribe(BUS_KEY)
      .then((n) => this.logger.log('Activated Bus Redis Subscription', n))
      .catch((e) => this.logger.error('Fail to subscribe redis bus', e))

    redisS.on('message', (channel: string, message: string) => {
      if (channel != BUS_KEY) return
      const busMsg: BusMessage = JSON.parse(message)
      const targetBus = this.busMap.get(busMsg.busKey)
      if (targetBus) {
        targetBus.handleBusMessage(busMsg)
      }
    })
  }

  getSocketBus(key: string): SocketBus {
    let bus = this.busMap.get(key)
    if (bus) return bus
    bus = new SocketBus(key, this)
    this.busMap.set(key, bus)
    return bus
  }

  sendRawMsg(msg: BusMessage) {
    this.redis.publish(BUS_KEY, JSON.stringify(msg))
  }
}
