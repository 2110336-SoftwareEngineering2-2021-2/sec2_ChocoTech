import { Inject, Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'

import { OnlineStatus } from '@backend/online-status/online-status'
import { SocketBusService } from '@backend/online-status/socket-bus.service'

@Injectable()
export class OnlineStatusService {
  constructor(
    @Inject('Redis') private readonly redis: Redis,
    private readonly socketBusService: SocketBusService,
  ) {}

  async getOnlineStatusForUser(username: string): Promise<OnlineStatus> {
    return new OnlineStatus(username, this.socketBusService, this.redis)
  }
}
