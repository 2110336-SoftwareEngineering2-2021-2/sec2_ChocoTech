import { Socket, io } from 'socket.io-client'

import { IMessageDTO, SocketClientEvent, SocketClientPayload, SocketNamespace } from '@libs/api'

export class SocketChatRoomController {
  roomId: string
  username: string
  socket: Socket

  constructor(roomId: string, username: string) {
    this.roomId = roomId
    this.username = username
    this.socket = io(process.env.NEXT_PUBLIC_SOCKET_API_URL + SocketNamespace.ONLINE_STATUS)
  }

  joinRoom() {
    const payload: SocketClientPayload[SocketClientEvent.JOIN_CHAT_ROOM] = {
      roomId: this.roomId,
      username: this.username,
    }
    this.socket.emit(SocketClientEvent.JOIN_CHAT_ROOM, payload)
  }

  leaveRoom() {
    const payload: SocketClientPayload[SocketClientEvent.LEAVE_CHAT_ROOM] = {
      roomId: this.roomId,
      username: this.username,
    }
    this.socket.emit(SocketClientEvent.LEAVE_CHAT_ROOM, payload)
  }

  sendMessage(message: IMessageDTO) {
    const payload: SocketClientPayload[SocketClientEvent.CHAT_MESSAGE] = {
      roomId: this.roomId,
      ...message,
    }
    this.socket.emit(SocketClientEvent.CHAT_MESSAGE, payload)
  }
}
