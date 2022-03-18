import { AuthService } from '@backend/auth/auth.service'
import { environment } from '@backend/environments/environment'
import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger = new Logger(GoogleStrategy.name)

  constructor(private readonly authService: AuthService) {
    super({
      clientID: environment.googleOAuth.clientId,
      clientSecret: environment.googleOAuth.clientSecret,
      callbackURL: `${environment.domain}/api/auth/google/callback`,
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/calendar.events',
      ],
    })
  }

  authorizationParams(): { [key: string]: string } {
    return {
      access_type: 'offline',
      approval_prompt: 'force',
    }
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    try {
      const user = await this.authService.validateGoogleOAuthLogin(
        accessToken,
        refreshToken,
        profile,
      )
      done(null, user)
    } catch (err) {
      throw new BadRequestException()
    }
  }
}
