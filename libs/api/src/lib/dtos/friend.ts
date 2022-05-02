export interface IfriendRequestRespondDTO {
  id: string
  accept: boolean
}

export interface IfriendRequestDTO {
  id: string
  dateSent: Date
  username: string
  displayname: string
  profilePictureURL?: string
}

export interface IMinimalFriend {
  username: string
  displayName: string
  profilePictureURL?: string | null
}

export interface IUsernameDTO {
  username: string
}
