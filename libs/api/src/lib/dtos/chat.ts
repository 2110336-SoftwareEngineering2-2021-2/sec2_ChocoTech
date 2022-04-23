export interface IMessageDTO {
  id: string
  timestamp: string
  author: {
    username: string
    displayName: string
    profilePictureURL?: string | null
  }
  message?: string | null
  imageUrl?: string | null
}

export interface IGetAllChatRoomsResponseDTO {
  id: string
  name?: string | null
  lastMessage?: null | IMessageDTO
  participants: string[]
}

export interface IGetChatRoomResponseDTO {
  id: string
  name?: string | null
  messages: IMessageDTO[]
  participants: string[]
}

export interface ICreateChatRoomRequestDTO {
  participants: string[]
  name?: string
}
