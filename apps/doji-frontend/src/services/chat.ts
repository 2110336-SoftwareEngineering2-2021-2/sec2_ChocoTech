import { Socket } from 'socket.io-client'

import {
  IMessageDTO,
  SocketClientEvent,
  SocketClientPayload,
  SocketNamespace,
  SocketServerEvent,
  SocketServerPayload,
} from '@libs/api'

import { manager } from './socketManager'

export class SocketChatRoomController {
  roomId: string
  username: string
  socket: Socket

  constructor(roomId: string, username: string) {
    this.roomId = roomId
    this.username = username
    this.socket = manager.socket(SocketNamespace.ONLINE_STATUS)
    this.connect()
    this.subscribeEvent()
  }

  connect() {
    this.socket.connect()
  }

  disconnect() {
    this.socket.disconnect()
  }

  subscribeEvent() {
    this.socket.on(
      SocketClientEvent.JOIN_CHAT_ROOM,
      (data: SocketClientPayload[SocketClientEvent.JOIN_CHAT_ROOM]) => {
        console.log('join chat room', data)
      },
    )
    this.socket.on(
      SocketClientEvent.LEAVE_CHAT_ROOM,
      (data: SocketClientPayload[SocketClientEvent.LEAVE_CHAT_ROOM]) => {
        console.log('leave chat room', data)
      },
    )
    this.socket.on(
      SocketClientEvent.CHAT_MESSAGE,
      (data: SocketClientPayload[SocketClientEvent.CHAT_MESSAGE]) => {
        console.log('chat message', data)
      },
    )
  }

  joinRoom() {
    const payload: SocketServerPayload[SocketServerEvent.JOIN_CHAT_ROOM] = {
      roomId: this.roomId,
    }
    this.socket.emit(SocketServerEvent.JOIN_CHAT_ROOM, payload)
  }

  leaveRoom() {
    const payload: SocketServerPayload[SocketServerEvent.LEAVE_CHAT_ROOM] = {
      roomId: this.roomId,
    }
    this.socket.emit(SocketServerEvent.LEAVE_CHAT_ROOM, payload)
  }

  sendMessage(message: IMessageDTO) {
    const payload: SocketServerPayload[SocketServerEvent.CHAT_MESSAGE] = {
      roomId: this.roomId,
      message: message.message,
      imageUrl: message.imageUrl,
    }
    this.socket.emit(SocketServerEvent.CHAT_MESSAGE, payload)
  }
}
