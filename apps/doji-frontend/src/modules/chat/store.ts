import create from 'zustand'
import createContext from 'zustand/context'

import { ChatRoomSocketController, ChatRoomSocketFactory } from '@frontend/services/chat'

import { IMessageDTO } from '@libs/api'

interface ChatRoomStore {
  messages: Record<string, IMessageDTO[]> // Key is roomId
  chatRoomSocketFactory: ChatRoomSocketFactory
  getSocketController: (roomId: string) => ChatRoomSocketController | undefined
  removeSocketController: (roomId: string) => void
  joinChatRoom: (roomIds: string | string[]) => void
  setMessages: (roomId: string, messages: IMessageDTO[]) => void
  sendMessage: (
    roomId: string,
    { message, imageUrl }: { message?: string; imageUrl?: string },
  ) => void
}

export const { Provider: ChatRoomProvider, useStore: useChatRoomStore } =
  createContext<ChatRoomStore>()

export const createChatRoomStore = () =>
  create<ChatRoomStore>((set, get) => {
    const getSocketController: ChatRoomStore['getSocketController'] = (roomId) => {
      return get().chatRoomSocketFactory.getConntroller(roomId)
    }

    const removeSocketController: ChatRoomStore['removeSocketController'] = (roomId) => {
      get().chatRoomSocketFactory.removeController(roomId)
    }

    const joinChatRoom: ChatRoomStore['joinChatRoom'] = (roomIds) => {
      const chatRoomSocketFactory = get().chatRoomSocketFactory
      roomIds = Array.isArray(roomIds) ? roomIds : [roomIds]
      roomIds.forEach((id) => {
        chatRoomSocketFactory.appendController(id, ({ roomId, ...rest }) => {
          const messages = get().messages[roomId] || []
          get().setMessages(roomId, [...messages, rest])
        })
      })
      set((state) => ({
        ...state,
        chatRoomSocketFactory,
      }))
    }

    const setMessages: ChatRoomStore['setMessages'] = (roomId, messages) => {
      const oldMessages = get().messages
      oldMessages[roomId] = messages
      set((state) => ({
        ...state,
        messages: oldMessages,
      }))
    }

    const sendMessage: ChatRoomStore['sendMessage'] = (roomId, { message, imageUrl }) => {
      const controller = get().getSocketController(roomId)
      if (controller) {
        controller.sendMessage({ message, imageUrl })
      }
    }

    return {
      messages: {},
      chatRoomSocketFactory: new ChatRoomSocketFactory(),
      getSocketController,
      removeSocketController,
      joinChatRoom,
      setMessages,
      sendMessage,
    }
  })
