import { User } from '@backend/entities/User'
import { environment } from '@backend/environments/environment'
import {
  RedisKeyType,
  deserializeUserReference,
  generateRandomUserToken,
  generateRedisKey,
  serializeUserReference,
} from '@backend/utils/redis'
import { IUserReference } from '@libs/api'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { MailgunService } from '@nextnm/nestjs-mailgun'
import bcrypt from 'bcrypt'
import fs from 'fs'
import Handlebars from 'handlebars'
import { Redis } from 'ioredis'
import path from 'path'

const TOKEN_EXPIRE_DURATION_SECONDS = 60 * 60 * 24 * 30 // 30 days
const RESET_TOKEN_EXPIRE_DURATION_SECONDS = 60 * 5 // 5 minutes

export class InvalidToken extends Error {
  constructor() {
    super('Token is invalid or expired.')
  }
}

@Injectable()
export class AuthService {
  constructor(
    @Inject('Redis') private readonly redis: Redis,
    @Inject(MailgunService) private mailgunService: MailgunService,
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
  ) {}

  async retriveUserReferenceFromToken(token: string): Promise<IUserReference> {
    const redisKey = generateRedisKey(RedisKeyType.USER_TOKEN, token)
    try {
      const userRefString = await this.redis.get(redisKey)
      const userRef = deserializeUserReference(userRefString, this.userRepo)

      // Extends expiration time
      await this.redis.expire(redisKey, TOKEN_EXPIRE_DURATION_SECONDS)
      return userRef
    } catch (e) {
      throw new InvalidToken()
    }
  }

  async issueTokenForUser(user: User): Promise<string> {
    const token = await generateRandomUserToken()
    const redisKey = generateRedisKey(RedisKeyType.USER_TOKEN, token)
    await this.redis.set(redisKey, serializeUserReference({ username: user.username }))
    await this.redis.expire(redisKey, TOKEN_EXPIRE_DURATION_SECONDS)
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

  async requestResetPassword(email: string): Promise<void> {
    try {
      // Find user by email if exists
      const user = await this.userRepo.findOneOrFail({ email: email })
      const token = await generateRandomUserToken()

      // Store reset password token in redis
      const redisKey = generateRedisKey(
        RedisKeyType.RESET_TOKEN,
        serializeUserReference({ username: user.username }),
      )
      await this.redis.set(redisKey, token)
      await this.redis.expire(redisKey, RESET_TOKEN_EXPIRE_DURATION_SECONDS)

      // Read reset email template file
      const resetPasswordTemplate = fs.readFileSync(
        path.resolve(__dirname, 'assets/reset-password.hbs'),
        'utf8',
      )
      const template = Handlebars.compile(resetPasswordTemplate)

      // Send the email
      const response = await this.mailgunService.createEmail(environment.mailgun.domain, {
        from: 'Doji Support <noreply@doji.com>',
        to: email,
        subject: '[Doji] Reset Password Request',
        html: template({ domain: environment.url, token, username: user.username }),
      })

      console.log(response)
    } catch (err) {
      throw new NotFoundException('User not found')
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const redisKey = generateRedisKey(RedisKeyType.RESET_TOKEN, token)
    try {
      const userRefString = await this.redis.get(redisKey)
      const userRef = deserializeUserReference(userRefString, this.userRepo)
      const user = await userRef.getUser()

      // Set new password
      const hashedPassword = await bcrypt.hash(newPassword, 10)
      user.passwordHash = hashedPassword

      // Save user
      await this.userRepo.persistAndFlush(user)
    } catch (err) {
      throw new InvalidToken()
    }
  }
}
