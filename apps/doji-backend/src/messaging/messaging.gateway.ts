import { AuthService } from '@backend/auth/auth.service'
import {
  AuthHandshake,
  ListenOnlineStatusRequest,
  OnlineStatusEvent,
} from '@backend/messaging/messaging.dto'
import { MessagingService } from '@backend/messaging/messaging.service'
import { ClientEvent, ServerEvent } from '@libs/api'
import { ArgumentsHost, Catch, Logger, UseFilters, ValidationError } from '@nestjs/common'
import {
  BaseWsExceptionFilter,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { Validator, ValidatorOptions } from 'class-validator'
import { Server, Socket } from 'socket.io'

class DtoValidationError extends Error {
  constructor(private readonly errors: ValidationError[]) {
    super(JSON.stringify(errors))
  }
}

@Catch(DtoValidationError)
class WsExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: DtoValidationError, host: ArgumentsHost): void {
    ;(host.switchToWs().getClient() as Socket).emit('error', exception.message)
  }
}

@WebSocketGateway()
@UseFilters(new WsExceptionFilter())
export class MessagingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server

  private readonly logger = new Logger('MessagingGateway')

  private readonly validator = new Validator()

  constructor(
    private readonly authService: AuthService,
    private readonly msgService: MessagingService,
  ) {
    msgService.listenToOnlineStatusChange((e: OnlineStatusEvent) => {
      Array.from(this.server.sockets.sockets.values()).map((x) => {
        if ((x.data.subscribed as Set<string>).has(e.username))
          x.emit(ServerEvent.ONLINE_STATUS_CHANGE, JSON.stringify(e))
      })
    })
  }

  private validateDto<T>(cls: ClassConstructor<T>, obj: any): T {
    const entity = plainToInstance(cls, obj)
    const err = this.validator.validateSync(
      entity as unknown as object,
      {
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
      } as ValidatorOptions,
    )
    if (err.length > 0) throw new DtoValidationError(err)
    return entity
  }

  async handleConnection(client: Socket) {
    try {
      const auth = this.validateDto(AuthHandshake, client.handshake.auth)
      const user = await this.authService.retriveUserFromToken(auth.token)
      client.data.username = user.username
      client.data.subscribed = new Set()
      await this.msgService.adjustOnlineSessionCount(user.username, 1)
      this.logger.log('Connected to ' + client.id + ' with user ' + user.username)
    } catch (e) {
      client.disconnect()
      this.logger.warn('Error while connecting: ' + e)
    }
  }

  async handleDisconnect(client: Socket) {
    await this.msgService.adjustOnlineSessionCount(client.data.username, -1)
    this.logger.log('Disconnected to ' + client.id + ' for user ' + client.data.username)
  }

  @SubscribeMessage(ClientEvent.LISTEN_ONLINE_STATUS)
  async listenOnlineStatusChange(@MessageBody() request: any, @ConnectedSocket() client: Socket) {
    const req = this.validateDto(ListenOnlineStatusRequest, request)
    ;(client.data.subscribed as Set<string>).add(req.username)
    const event = new OnlineStatusEvent()
    event.isOnline = await this.msgService.isOnline(req.username)
    event.username = req.username
    return event
  }
}
