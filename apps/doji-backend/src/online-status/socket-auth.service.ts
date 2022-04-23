import { Injectable, Logger } from '@nestjs/common'
import { parse as parseCookie } from 'cookie'
import { Socket } from 'socket.io'

import { AuthService } from '@backend/auth/auth.service'
import { IUserReference } from '@backend/types'

import { CookieKey } from '@libs/api'

@Injectable()
export class SocketAuthService {
  private logger = new Logger('SocketAuthService')

  constructor(private readonly authService: AuthService) {}

  async authenticateSocket(client: Socket): Promise<IUserReference | null> {
    const cookies = parseCookie(client.handshake.headers['cookie'] || '')
    const token = cookies[CookieKey.ACCESS_TOKEN]
    if (!token) {
      this.logger.warn('Token auth failed: No cookie')
      return null
    }
    try {
      return await this.authService.validateAccessToken(token)
    } catch (e) {
      this.logger.warn('Token auth failed', e)
      return null
    }
  }
}
