import { IFriendRequestResponseDTO } from '@libs/api'

export class FriendRequestResponseDTO implements IFriendRequestResponseDTO {
  id: string
  accept: boolean
}
