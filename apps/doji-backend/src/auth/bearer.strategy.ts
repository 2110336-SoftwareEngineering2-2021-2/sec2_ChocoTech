import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-http-bearer'
import { AuthService } from 'src/auth/auth.service'

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  private readonly logger = new Logger(BearerStrategy.name)

  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(token: string) {
    try {
      return await this.authService.retriveUserFromToken(token)
    } catch (e) {
      this.logger.log(`token authentication failed: ${JSON.stringify(Object.entries(e))}`)
      throw new UnauthorizedException('invalid token')
    }
  }
}
