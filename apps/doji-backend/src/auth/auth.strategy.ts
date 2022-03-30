import { InvalidToken } from '@backend/auth/auth.exception'
import { AuthService } from '@backend/auth/auth.service'
import { IUserReference } from '@backend/types'
import { CookieKey } from '@libs/api'
import { Injectable, Logger } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-cookie'

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'auth') {
  private readonly logger = new Logger(AuthStrategy.name)

  constructor(private readonly authService: AuthService) {
    super({
      cookieName: CookieKey.ACCESS_TOKEN,
    })
  }

  async validate(token: string): Promise<IUserReference> {
    try {
      return await this.authService.validateAccessToken(token)
    } catch (err) {
      this.logger.log(`Cookie failed: ${JSON.stringify(Object.entries(err))}`)
      throw new InvalidToken()
    }
  }
}
