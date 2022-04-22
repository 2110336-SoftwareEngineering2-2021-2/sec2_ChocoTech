import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common'
import '@nestjs/platform-socket.io'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets'
import { Socket } from 'socket.io'

import {
  OnlineStatusSocketContext,
  SubscriptionRequest,
  UnsubscriptionRequest,
} from '@backend/online-status/online-status.dto'
import { OnlineStatusService } from '@backend/online-status/online-status.service'
import { SocketAuthService } from '@backend/online-status/socket-auth.service'
import { SocketBusClientContext } from '@backend/online-status/socket-bus-client-context'
import { SocketBusService } from '@backend/online-status/socket-bus.service'
import { WsExceptionFilter } from '@backend/online-status/socket.filter'

import { IUserStatusResponse, OnlineStatusEvent, SocketNamespace } from '@libs/api'

@WebSocketGateway({ namespace: SocketNamespace.ONLINE_STATUS, cors: true })
@UsePipes(ValidationPipe)
@UseFilters(WsExceptionFilter)
export class OnlineStatusGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly socketAuthService: SocketAuthService,
    private readonly socketBusService: SocketBusService,
    private readonly onlineStatusService: OnlineStatusService,
  ) {}

  async handleConnection(client: Socket) {
    const userRef = await this.socketAuthService.authenticateSocket(client)
    if (!userRef) {
      client.disconnect()
      return
    }
    const busContext = new SocketBusClientContext(client)
    const userOnlineStatus = await this.onlineStatusService.getOnlineStatusForUser(userRef.username)

    //Initialize Context
    client.data.context = {
      userRef: userRef,
      busContext: busContext,
      userOnlineStatus: userOnlineStatus,
    } as OnlineStatusSocketContext

    // Mark user online
    await userOnlineStatus.incrementActiveSession()
  }

  @SubscribeMessage(OnlineStatusEvent.SUBSCRIBE)
  async onSubscribe(
    @MessageBody() body: SubscriptionRequest,
    @ConnectedSocket() client: Socket,
  ): Promise<IUserStatusResponse> {
    const context: OnlineStatusSocketContext = client.data.context
    const targetOnlineStatus = await this.onlineStatusService.getOnlineStatusForUser(body.username)

    context.busContext.subscribe(targetOnlineStatus.statusChangeBus)

    return {
      username: targetOnlineStatus.username,
      online: await targetOnlineStatus.isOnline(),
    }
  }

  @SubscribeMessage(OnlineStatusEvent.UNSUBSCRIBE)
  async onUnsubscribe(
    @MessageBody() body: UnsubscriptionRequest,
    @ConnectedSocket() client: Socket,
  ) {
    const context: OnlineStatusSocketContext = client.data.context
    const targetOnlineStatus = await this.onlineStatusService.getOnlineStatusForUser(body.username)

    context.busContext.unsubscribe(targetOnlineStatus.statusChangeBus)
  }

  async handleDisconnect(client: Socket) {
    const context: OnlineStatusSocketContext = client.data.context
    if (!context) return
    await context.userOnlineStatus.decrementActiveSession()
    context.busContext.cleanUp()
  }
}
