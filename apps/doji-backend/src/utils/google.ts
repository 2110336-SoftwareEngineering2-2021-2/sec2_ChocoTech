import { environment } from '@backend/environments/environment'
import { google } from 'googleapis'

export function createGoogleOAuth2Client() {
  return new google.auth.OAuth2(
    environment.googleOAuth.clientId,
    environment.googleOAuth.clientSecret,
    `${environment.domain.backend}/auth/google/callback`,
  )
}
