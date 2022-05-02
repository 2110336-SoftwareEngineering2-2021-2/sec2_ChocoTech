import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'
import { Socket } from 'socket.io'

import { AuthService } from '@backend/auth/auth.service'

@Injectable()
export class WsAuthGuard implements CanActivate {
  private readonly logger: Logger = new Logger(WsAuthGuard.name)

  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client: Socket = context.switchToWs().getClient<Socket>()
      const userRef = await this.authService.validateWebSocket(client)
      this.logger.log(`User ${userRef.username} validated`)
      const req = context.switchToHttp().getRequest()

      req.user = userRef
      client.handshake.headers.cookie = req.headers.cookie

      return true
    } catch (err) {
      throw new WsException(err.message)
    }
  }
}
