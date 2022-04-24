import create from 'zustand'
import createContext from 'zustand/context'

import { ChatRoomSocketController, ChatRoomSocketFactory } from '@frontend/services/chat'

import { IMessageDTO } from '@libs/api'

interface ChatRoomStore {
  messages: Record<string, IMessageDTO[]> // Key is roomId
  currentRoomId: string | null
  chatRoomSocketFactory: ChatRoomSocketFactory
  getSocketController: (roomId: string) => ChatRoomSocketController | undefined
  removeSocketController: (roomId: string) => void
  setCurrentRoomId: (roomId: string) => void
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

    const setCurrentRoomId: ChatRoomStore['setCurrentRoomId'] = (roomId) => {
      const chatRoomSocketFactory = get().chatRoomSocketFactory
      get().removeSocketController(roomId)
      chatRoomSocketFactory.appendController(roomId, ({ roomId, ...rest }) => {
        const messages = get().messages[roomId] || []
        get().setMessages(roomId, [...messages, rest])
      })
      set((state) => ({
        ...state,
        currentRoomId: roomId,
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
      currentRoomId: null,
      chatRoomSocketFactory: new ChatRoomSocketFactory(),
      getSocketController,
      removeSocketController,
      setCurrentRoomId,
      setMessages,
      sendMessage,
    }
  })
