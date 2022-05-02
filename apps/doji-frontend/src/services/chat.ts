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

interface SocketFactory {
  handleConnection(): void
  handleDisconnection(): void
}

export class ChatRoomSocketFactory implements SocketFactory {
  #socket: Socket
  #controllers: ChatRoomSocketController[]

  constructor(initialControllers: ChatRoomSocketController[] = []) {
    this.#controllers = initialControllers
    try {
      this.#socket = manager.socket(SocketNamespace.CHAT)
      this.#socket.on('connect', () => {
        this.handleConnection()
      })
      this.#socket.on('disconnect', () => {
        this.handleDisconnection()
      })
    } catch (err) {
      console.log(err)
    }
  }

  getConntroller(roomId: string): ChatRoomSocketController | undefined {
    return this.#controllers.find((controller) => controller.roomId === roomId)
  }

  handleConnection() {
    this.listenEvents()
    console.log('Socket connected', this.#socket.id)
  }

  handleDisconnection() {
    console.log('Socket disconnected', this.#socket.id)
  }

  disconnect() {
    this.#controllers.forEach((controller) => controller.destroy())
    this.#socket.disconnect()
  }

  listenEvents() {
    this.#socket.on(
      SocketClientEvent.JOIN_CHAT_ROOM,
      (data: SocketClientPayload[SocketClientEvent.JOIN_CHAT_ROOM]) => {
        console.log('join chat room', data)
      },
    )
    this.#socket.on(
      SocketClientEvent.LEAVE_CHAT_ROOM,
      (data: SocketClientPayload[SocketClientEvent.LEAVE_CHAT_ROOM]) => {
        console.log('leave chat room', data)
      },
    )
    this.#socket.on(
      SocketClientEvent.CHAT_MESSAGE,
      (data: SocketClientPayload[SocketClientEvent.CHAT_MESSAGE]) => {
        const controller = this.getConntroller(data.roomId)
        controller.updateMessageCallback(data)
      },
    )
  }

  appendController(roomId: string, updateMessageCallback: UpdateMessageCallback) {
    const controller = this.getConntroller(roomId)
    if (controller) return
    const newController = new ChatRoomSocketController(this.#socket, roomId, updateMessageCallback)
    this.#controllers.push(newController)
  }

  removeController(roomId: string) {
    const controller = this.getConntroller(roomId)
    if (controller) {
      controller.destroy()
      this.#controllers = this.#controllers.filter((c) => c !== controller)
    }
  }
}

interface SocketController {
  afterInit(): void
  destroy(): void
}

export class ChatRoomSocketController implements SocketController {
  #socket: Socket
  roomId: string
  updateMessageCallback: UpdateMessageCallback | undefined

  constructor(socket: Socket, roomId: string, updateMessageCallback: UpdateMessageCallback) {
    this.#socket = socket
    this.roomId = roomId
    this.updateMessageCallback = updateMessageCallback
    this.afterInit()
  }

  afterInit() {
    this.joinRoom()
  }

  destroy() {
    this.leaveRoom()
  }

  joinRoom() {
    console.log(this.#socket.connected)
    const payload: SocketServerPayload[SocketServerEvent.JOIN_CHAT_ROOM] = {
      roomId: this.roomId,
    }
    this.#socket.emit(SocketServerEvent.JOIN_CHAT_ROOM, payload)
  }

  leaveRoom() {
    const payload: SocketServerPayload[SocketServerEvent.LEAVE_CHAT_ROOM] = {
      roomId: this.roomId,
    }
    this.#socket.emit(SocketServerEvent.LEAVE_CHAT_ROOM, payload)
  }

  sendMessage({ message, imageUrl }: { message?: string; imageUrl?: string }) {
    const payload: SocketServerPayload[SocketServerEvent.CHAT_MESSAGE] = {
      roomId: this.roomId,
      message: message,
      imageUrl: imageUrl,
    }
    this.#socket.emit(SocketServerEvent.CHAT_MESSAGE, payload)
  }
}
