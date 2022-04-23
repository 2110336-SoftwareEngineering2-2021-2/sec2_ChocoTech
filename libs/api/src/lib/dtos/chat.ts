export interface IMinimalUser {
  username: string
  displayName: string
  profilePictureURL?: string | null
}

export interface IMessageDTO {
  id: string
  timestamp: string
  author: IMinimalUser
  message?: string | null
  imageUrl?: string | null
}

export interface IGetAllChatRoomsResponseDTO {
  id: string
  name?: string | null
  lastMessage?: null | IMessageDTO
  participants: IMinimalUser[]
}

export interface IGetChatRoomResponseDTO {
  id: string
  name?: string | null
  messages: IMessageDTO[]
  participants: IMinimalUser[]
}

export interface ICreateChatRoomRequestDTO {
  participants: string[]
  name?: string
}
