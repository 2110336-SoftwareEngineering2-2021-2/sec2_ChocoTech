import { User } from '@backend/entities/User'
import { IUser, IUserReference } from '@libs/api'
import { EntityRepository } from '@mikro-orm/core'
import { randomBytes } from 'crypto'

export enum RedisKeyType {
  USER_TOKEN = 'user_token',
  RESET_TOKEN = 'reset_token',
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
): IUserReference<User> {
  const obj: RawUserReference = JSON.parse(userRefString)
  const userRef: IUserReference<User> = {
    username: obj.username,
    getUser: () => userRepo.findOneOrFail({ username: obj.username }) as any,
  }
  return userRef
}
