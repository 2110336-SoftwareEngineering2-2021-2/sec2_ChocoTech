import { Socket } from 'socket.io-client'

import {
  SocketClientEvent,
  SocketClientPayload,
  SocketNamespace,
  SocketServerEvent,
  SocketServerPayload,
} from '@libs/api'

import { manager } from './socketManager'

type UpdateMessageCallback = (message: SocketClientPayload[SocketClientEvent.CHAT_MESSAGE]) => void

export class SocketChatRoomController {
  roomId: string
  socket: Socket
  updateMessageCallback: UpdateMessageCallback | undefined

  constructor(roomId: string) {
    this.roomId = roomId
    this.updateMessageCallback = undefined

    try {
      this.socket = manager.socket(SocketNamespace.CHAT)
      console.log('initialized socket controller', this.roomId)
      this.socket.on('connect', () => {
        this.handleConnection()
      })
      this.socket.on('disconnect', () => {
        this.handleDisconnection()
      })
    } catch (e) {
      console.log(e)
    }
  }

  disconnect() {
    this.leaveRoom()
    this.socket.disconnect()
  }

  handleConnection() {
    console.log('Socket connected', this.roomId)
    this.listenEvent()
    this.joinRoom()
  }

  handleDisconnection() {
    console.log('Socket disconnected', this.roomId)
  }

  listenEvent() {
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
        this?.updateMessageCallback(data)
      },
    )
  }

  joinRoom() {
    console.log(this.socket.connected)
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

  sendMessage(
    { message, imageUrl }: { message?: string; imageUrl?: string },
    updateMessageCallback?: UpdateMessageCallback,
  ) {
    const payload: SocketServerPayload[SocketServerEvent.CHAT_MESSAGE] = {
      roomId: this.roomId,
      message: message,
      imageUrl: imageUrl,
    }
    this.updateMessageCallback = updateMessageCallback
    this.socket.emit(SocketServerEvent.CHAT_MESSAGE, payload)
  }
}
