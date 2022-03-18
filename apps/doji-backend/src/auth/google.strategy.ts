import { AuthService } from '@backend/auth/auth.service'
import { environment } from '@backend/environments/environment'
import { IUserReference } from '@libs/api'
import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
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
      const { name, emails, photos } = profile
      const user = {
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
        picture: photos[0].value,
        accessToken,
      }
      await this.authService.validateGoogleOAuthLogin(user.email, refreshToken)
      done(null, user)
    } catch (err) {
      throw new BadRequestException()
    }
  }
}
