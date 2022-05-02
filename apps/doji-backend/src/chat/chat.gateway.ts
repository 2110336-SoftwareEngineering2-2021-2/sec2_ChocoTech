import { Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

import { AuthService } from '@backend/auth/auth.service'
import { ChatService } from '@backend/chat/chat.service'
import { WsExceptionFilter } from '@backend/online-status/socket.filter'

import {
  SocketClientEvent,
  SocketClientPayload,
  SocketNamespace,
  SocketServerEvent,
  SocketServerPayload,
} from '@libs/api'

@UsePipes(ValidationPipe)
@UseFilters(WsExceptionFilter)
@WebSocketGateway({
  namespace: SocketNamespace.CHAT,
  cors: true,
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger: Logger = new Logger(ChatGateway.name)

  @WebSocketServer() server: Server

  constructor(
    private readonly authService: AuthService,
    private readonly chatService: ChatService,
  ) {}

  afterInit(server: Server) {
    //
  }

  async handleConnection(client: Socket) {
    const userRef = await this.authService.validateWebSocket(client)
    this.logger.log(`Client connected: ${client.id}, user: ${userRef?.username}`)
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  /**
   * Register Observer - join a chat room
   */
  @SubscribeMessage(SocketServerEvent.JOIN_CHAT_ROOM)
  async joinChatRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: SocketServerPayload[SocketServerEvent.JOIN_CHAT_ROOM],
  ) {
    const userRef = await this.authService.validateWebSocket(client)
    await this.chatService.joinChatRoom(client.id, userRef.username)
    const data: SocketClientPayload[SocketClientEvent.JOIN_CHAT_ROOM] = {
      roomId: payload.roomId,
      username: userRef.username,
    }
    this.logger.log(`user: ${userRef.username} joined chat room ${payload.roomId}`)
    client.join(payload.roomId)
    this.server.to(payload.roomId).emit(SocketClientEvent.JOIN_CHAT_ROOM, data)
  }

  /**
   * Unregister Observer - leave a chat room
   */
  @SubscribeMessage(SocketServerEvent.LEAVE_CHAT_ROOM)
  async leaveChatRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: SocketServerPayload[SocketServerEvent.LEAVE_CHAT_ROOM],
  ) {
    const userRef = await this.authService.validateWebSocket(client)
    await this.chatService.leaveChatRoom(client.id)
    const data: SocketClientPayload[SocketClientEvent.LEAVE_CHAT_ROOM] = {
      roomId: payload.roomId,
      username: userRef.username,
    }
    this.logger.log(`Client: ${client.id} left chat room ${payload.roomId}`)
    client.leave(payload.roomId)
    this.server.to(payload.roomId).emit(SocketClientEvent.LEAVE_CHAT_ROOM, data)
  }

  /**
   * Receive message from client
   */
  @SubscribeMessage(SocketServerEvent.CHAT_MESSAGE)
  async handleChatMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: SocketServerPayload[SocketServerEvent.CHAT_MESSAGE],
  ) {
    const userRef = await this.authService.validateWebSocket(client)
    const author = await userRef.getUser()
    const { roomId, ...rest } = payload
    const message = await this.chatService.storeMessage(author, roomId, rest)
    const data: SocketClientPayload[SocketClientEvent.CHAT_MESSAGE] = {
      roomId: roomId,
      ...payload,
      ...message,
    }
    this.logger.log(`User: ${userRef.username} send message to room ${roomId}`)
    this.server.to(roomId).emit(SocketClientEvent.CHAT_MESSAGE, data)
  }
}
