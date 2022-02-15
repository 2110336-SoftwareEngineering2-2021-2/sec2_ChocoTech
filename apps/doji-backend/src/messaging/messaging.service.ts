import { newRedisClient } from '@backend/external/external.module'
import { OnlineStatusEvent } from '@backend/messaging/messaging.dto'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { channel } from 'diagnostics_channel'
import { Redis } from 'ioredis'

enum MessagingPubSubTopic {
  ONLINE_STATUS_CHANGE_PUBSUB = 'online-status',
}

enum MessagingRedisPrefix {
  ONLINE_STATUS_PREFIX = 'online-status::',
}

@Injectable()
export class MessagingService {
  private readonly logger = new Logger('MessagingService')

  constructor(
    @Inject('Redis') private readonly redis: Redis,
    @Inject('RedisSubscriber') private readonly redisSub: Redis,
  ) {
    redisSub
      .subscribe(MessagingPubSubTopic.ONLINE_STATUS_CHANGE_PUBSUB)
      .then((c) => this.logger.log(`Subscribed to ONLINE_STATUS_CHANGE PUBSUB Success = ${c}`))
      .catch((e) => this.logger.error(e))
  }

  async adjustOnlineSessionCount(username: string, numSession: number) {
    const key = MessagingRedisPrefix.ONLINE_STATUS_PREFIX + username
    const newCnt = await this.redis.incrby(key, numSession)
    await this.redis.expire(key, 60)

    const event = new OnlineStatusEvent()
    event.username = username

    if (newCnt == 0) {
      await this.redis.del(key)
      event.isOnline = false
    } else {
      event.isOnline = true
    }
    await this.redis.publish(
      MessagingPubSubTopic.ONLINE_STATUS_CHANGE_PUBSUB,
      JSON.stringify(event),
    )
  }

  async isOnline(username: string): Promise<boolean> {
    const key = MessagingRedisPrefix.ONLINE_STATUS_PREFIX + username
    return (await this.redis.exists(key)) > 0
  }

  async listenToOnlineStatusChange(listener: (event: OnlineStatusEvent) => void) {
    this.redisSub.on('message', (channel, message) => {
      if (channel == MessagingPubSubTopic.ONLINE_STATUS_CHANGE_PUBSUB) {
        listener(plainToInstance(OnlineStatusEvent, JSON.parse(message)))
      }
    })
  }
}
