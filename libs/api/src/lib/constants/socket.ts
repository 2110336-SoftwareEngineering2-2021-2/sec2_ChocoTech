import { IMessageDTO } from '../dtos/chat'

// Server Section

export enum SocketServerEvent {
  JOIN_CHAT_ROOM = 'server-join-chat-room',
  LEAVE_CHAT_ROOM = 'server-leave-chat-room',
  CHAT_MESSAGE = 'server-chat-message',
}

export interface SocketServerPayload {
  [SocketServerEvent.JOIN_CHAT_ROOM]: {
    /**
     * The room id to join
     */
    roomId: string
  }

  [SocketServerEvent.LEAVE_CHAT_ROOM]: {
    /**
     * The room id to join
     */
    roomId: string
  }

  [SocketServerEvent.CHAT_MESSAGE]: {
    /**
     * The room id to join
     */
    roomId: string

    /**
     * message from author as a plain text
     */
    message?: string

    /**
     * image url from author
     */
    imageUrl?: string
  }
}

// Client Section

export enum SocketClientEvent {
  JOIN_CHAT_ROOM = 'client-join-chat-room',
  LEAVE_CHAT_ROOM = 'client-leave-chat-room',
  CHAT_MESSAGE = 'client-chat-message',
}

export interface SocketClientPayload {
  [SocketClientEvent.JOIN_CHAT_ROOM]: {
    /**
     * The room id to join
     */
    roomId: string

    /**
     * Username who joined the room
     */
    username: string
  }

  [SocketClientEvent.LEAVE_CHAT_ROOM]: {
    /**
     * The room id to join
     */
    roomId: string

    /**
     * Username who left the room
     */
    username: string
  }

  [SocketClientEvent.CHAT_MESSAGE]: IMessageDTO
}
