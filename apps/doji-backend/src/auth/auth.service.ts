import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { ForbiddenException, Inject, Injectable } from '@nestjs/common'
import bcrypt from 'bcrypt'
import { randomBytes } from 'crypto'
import { Redis } from 'ioredis'
import { User } from 'src/entities/User'

export type UserToken = string

export interface UserReference {
  username: string
  getUser(): Promise<User>
}

interface RawUserReference {
  username: string
}

function userTokenToRedisKey(token: UserToken) {
  return `usertoken::${token}`
}

function serializeUserReference(ref: UserReference) {
  const raw: RawUserReference = { username: ref.username }
  return JSON.stringify(raw)
}

function deserializeUserReference(
  userRefString: string,
  userRepo: EntityRepository<User>,
): UserReference {
  const obj: RawUserReference = JSON.parse(userRefString)
  return {
    username: obj.username,
    getUser: () => userRepo.findOneOrFail({ username: obj.username }),
  }
}

function generateRandomUserToken(): Promise<UserToken> {
  return new Promise((res, rej) => {
    randomBytes(48, (err, buf) => {
      if (err) rej(err)
      else res(buf.toString('hex'))
    })
  })
}

const TOKEN_EXPIRE_DURATION_SECONDS = 60 * 60 * 24 * 30

export class InvalidToken extends Error {
  constructor() {
    super('Invalid Token')
  }
}

@Injectable()
export class AuthService {
  constructor(
    @Inject('Redis') private readonly redis: Redis,
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
  ) {}

  async retriveUserFromToken(token: UserToken): Promise<UserReference> {
    const key = userTokenToRedisKey(token)
    try {
      const ref_str = await this.redis.get(key)
      const user = deserializeUserReference(ref_str, this.userRepo)

      await user.getUser()

      //Extends expiration time
      await this.redis.expire(key, TOKEN_EXPIRE_DURATION_SECONDS)

      return user
    } catch (e) {
      throw new InvalidToken()
    }
  }

  async issueTokenForUser(user: User): Promise<UserToken> {
    const ref: UserReference = {
      username: user.username,
      getUser: () => Promise.resolve(user),
    }
    const token = await generateRandomUserToken()
    const key = userTokenToRedisKey(token)
    await this.redis.set(key, serializeUserReference(ref))
    await this.redis.expire(key, TOKEN_EXPIRE_DURATION_SECONDS)
    return token
  }

  async userFromUsernamePassword(username: string, password: string): Promise<User | null> {
    const user = await this.userRepo.findOne({ username: username })
    if (!user) return null
    if (await bcrypt.compare(password, user.passwordHash)) {
      return user
    } else {
      return null
    }
  }
}
