import { EntityRepository } from '@mikro-orm/core'
import { Logger } from '@nestjs/common'
import { randomBytes } from 'crypto'
import { Redis } from 'ioredis'
import { setEnvironmentData } from 'worker_threads'

import { User } from '@backend/entities/User'
import { IUserReference } from '@backend/types'

export enum RedisKeyType {
  USER_ACCESS_TOKEN = 'user_access_token',
  RESET_PASSWORD_TOKEN = 'reset_access_token',
  GOOGLE_ACCESS_TOKEN = 'google_access_token',
  CHAT_ROOM = 'chat_room',
}

export enum RedisPubSubTopic {
  ONLINE_STATUS_CHANGE_PUBSUB = 'online-status',
  CHAT_MESSAGE_PUBSUB = 'chat-message',
}

export function generateRandomUserToken(): Promise<string> {
  return new Promise((res, rej) => {
    randomBytes(48, (err, buf) => {
      if (err) rej(err)
      else res(buf.toString('hex'))
    })
  })
}

export function generateRedisKey(key: RedisKeyType, token: string) {
  return `${key}::${token}`
}

export function subscribeRedisPubSub(redisSub: Redis, topic: RedisPubSubTopic, logger?: Logger) {
  redisSub
    .subscribe(topic)
    .then((c) => logger?.log(`Subscribe ${topic} Successfully, ${c}`))
    .catch((e) => logger?.error(e))
}

interface RawUserReference {
  username: string
}

export function serializeUserReference(ref: RawUserReference) {
  const raw: RawUserReference = { username: ref.username }
  return JSON.stringify(raw)
}

export function deserializeUserReference(
  userRefString: string,
  userRepo: EntityRepository<User>,
): IUserReference {
  const obj: RawUserReference = JSON.parse(userRefString)
  const userRef: IUserReference = {
    username: obj.username,
    getUser: () => userRepo.findOneOrFail({ username: obj.username }) as any,
  }
  return userRef
}
