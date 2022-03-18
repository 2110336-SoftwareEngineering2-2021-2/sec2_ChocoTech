import { AuthService } from '@backend/auth/auth.service'
import { IUserReference } from '@libs/api'
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-http-bearer'

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  private readonly logger = new Logger(BearerStrategy.name)

  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(token: string): Promise<IUserReference> {
    try {
      return await this.authService.validatePasswordLogin(token)
    } catch (e) {
      this.logger.log(`Token authentication failed: ${JSON.stringify(Object.entries(e))}`)
      throw new UnauthorizedException('invalid token')
    }
  }
}
