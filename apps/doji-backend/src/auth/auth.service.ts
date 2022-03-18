import { User } from '@backend/entities/User'
import { environment } from '@backend/environments/environment'
import {
  RedisKeyType,
  deserializeUserReference,
  generateRandomUserToken,
  generateRedisKey,
  serializeUserReference,
} from '@backend/utils/redis'
import { IGoogleUser, IUserReference } from '@libs/api'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { MailgunService } from '@nextnm/nestjs-mailgun'
import bcrypt from 'bcrypt'
import fs from 'fs'
import { google } from 'googleapis'
import Handlebars from 'handlebars'
import { Redis } from 'ioredis'
import { Profile } from 'passport-google-oauth20'
import path from 'path'

const TOKEN_EXPIRE_DURATION_SECONDS = 60 * 60 * 24 * 30 // 30 days
const RESET_TOKEN_EXPIRE_DURATION_SECONDS = 60 * 5 // 5 minutes

interface ILogin {
  accessToken: string
  user: User
}

export class InvalidToken extends Error {
  constructor() {
    super('Token is invalid or expired.')
  }
}

@Injectable()
export class AuthService {
  private readonly oauth2Client = new google.auth.OAuth2(
    environment.googleOAuth.clientId,
    environment.googleOAuth.clientSecret,
    `${environment.domain}/api/auth/google/callback`,
  )
  private readonly oauth2 = google.oauth2({
    version: 'v2',
    auth: this.oauth2Client,
  })
  private readonly scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/calendar.events',
  ]

  constructor(
    private readonly jwtService: JwtService,
    @Inject('Redis') private readonly redis: Redis,
    @Inject(MailgunService) private mailgunService: MailgunService,
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
  ) {}

  private async _storeAccessToken(key: RedisKeyType, username: string): Promise<string> {
    const token = await generateRandomUserToken()
    const redisKey = generateRedisKey(key, token)
    await this.redis.set(redisKey, serializeUserReference({ username }))
    await this.redis.expire(redisKey, TOKEN_EXPIRE_DURATION_SECONDS)
    return token
  }

  async loginWithPassword(username: string, password: string): Promise<ILogin> {
    const user = await this.userRepo.findOne({ username: username })
    if (!user) {
      throw new ForbiddenException('No user with such username or password is incorrect')
    }
    if (!(await bcrypt.compare(password, user.passwordHash))) {
      throw new ForbiddenException('No user with such username or password is incorrect')
    }
    const accessToken = await this._storeAccessToken(RedisKeyType.USER_ACCESS_TOKEN, username)
    return {
      accessToken: accessToken,
      user,
    }
  }

  async validatePasswordLogin(token: string): Promise<IUserReference> {
    const redisKey = generateRedisKey(RedisKeyType.USER_ACCESS_TOKEN, token)
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

  async generateGoogleLoginURL(username: string): Promise<string> {
    const accessToken = await this._storeAccessToken(RedisKeyType.USER_ACCESS_TOKEN, username)
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this.scopes,
      redirect_uri: `${environment.domain}/api/auth/google/callback?token=${accessToken}`,
    })
  }

  async loginWithGoogleOAuth(code: string, username: string): Promise<ILogin> {
    const user = await this.userRepo.findOne({ username })
    if (!user) {
      throw new NotFoundException('No user with such email')
    }

    try {
      const { tokens } = await this.oauth2Client.getToken(code)
      console.log(tokens)
      this.oauth2Client.setCredentials(tokens)
      google.options({ auth: this.oauth2Client })

      this.oauth2Client.on('tokens', async (tokens) => {
        if (tokens.refresh_token) {
          console.log('refresh tk', tokens.refresh_token)
          user.googleRefreshToken = tokens.refresh_token
          await this.userRepo.persistAndFlush(user)
        }
        console.log('access tk', tokens.access_token)
      })

      const { data } = await this.oauth2.userinfo.get()

      user.firstName = user.firstName ?? data.given_name
      user.lastName = user.lastName ?? data.family_name
      user.profilePictureURL = user.profilePictureURL ?? data.picture
      user.googleRefreshToken = tokens.refresh_token
      await this.userRepo.persistAndFlush(user)

      return {
        accessToken: tokens.access_token,
        user: user,
      }
    } catch (err) {
      throw new InvalidToken()
    }
  }

  async validateGoogleOAuthLoginV0(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<IGoogleUser> {
    const { name, emails, photos } = profile
    const email = emails[0].value
    const user = await this.userRepo.findOne({ email: email })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    user.googleRefreshToken = refreshToken
    user.firstName = user.firstName ?? name.givenName
    user.lastName = user.lastName ?? name.familyName
    user.profilePictureURL = user.profilePictureURL ?? photos[0].value

    await this.userRepo.persistAndFlush(user)

    const redisKey = generateRedisKey(
      RedisKeyType.RESET_PASSWORD_TOKEN,
      serializeUserReference({ username: user.username }),
    )
    await this.redis.set(redisKey, accessToken)
    await this.redis.expire(redisKey, TOKEN_EXPIRE_DURATION_SECONDS)

    return {
      email,
      firstName: user.firstName,
      lastName: user.lastName,
      picture: user.profilePictureURL,
      accessToken,
    }
  }

  async sendResetPasswordEmail(email: string): Promise<void> {
    try {
      // Find user by email if exists
      const user = await this.userRepo.findOneOrFail({ email: email })
      const token = await generateRandomUserToken()

      // Store reset password token in redis
      const redisKey = generateRedisKey(
        RedisKeyType.RESET_PASSWORD_TOKEN,
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
        html: template({ domain: environment.domain, token, username: user.username }),
      })

      console.log(response)
    } catch (err) {
      throw new NotFoundException('User not found')
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const redisKey = generateRedisKey(RedisKeyType.RESET_PASSWORD_TOKEN, token)
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
