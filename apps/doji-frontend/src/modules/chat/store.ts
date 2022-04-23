import create from 'zustand'
import createContext from 'zustand/context'

import { SocketChatRoomController } from '@frontend/services/chat'

import { IGetAllChatRoomsResponseDTO } from '@libs/api'

interface ChatRoomStore {
  availableChatRooms: IGetAllChatRoomsResponseDTO[]
  currentRoomId: string
  socketControllers: SocketChatRoomController[]
  getSocketController: (roomId: string) => SocketChatRoomController | undefined
  setCurrentRoomId: (roomId: string) => void
  cleanup: () => void
}

export const { Provider: ChatRoomProvider, useStore: useChatRoomStore } =
  createContext<ChatRoomStore>()

export const createChatRoomStore = () =>
  create<ChatRoomStore>((set, get) => {
    const getSocketController = (roomId) => {
      const socketControllers = get().socketControllers
      return socketControllers.find((s) => s.roomId === roomId)
    }

    const removeSocket = (socket: SocketChatRoomController) => {
      socket.leaveRoom()
      const socketControllers = get().socketControllers
      return socketControllers.filter((s) => s.roomId !== socket.roomId)
    }

    const setCurrentRoomId = (roomId) => {
      const foundSocket = getSocketController(roomId)
      const remainingSockets = foundSocket ? removeSocket(foundSocket) : get().socketControllers
      const newSocket = new SocketChatRoomController(roomId)

      set((state) => ({
        ...state,
        socketControllers: [...remainingSockets, newSocket],
        currentRoomId: roomId,
      }))
    }

    const cleanup = () => {
      const socketControllers = get().socketControllers
      socketControllers.forEach((s) => s.disconnect())
    }

    return {
      availableChatRooms: [],
      currentRoomId: null,
      socketControllers: [],
      getSocketController,
      setCurrentRoomId,
      cleanup,
    }
  })
