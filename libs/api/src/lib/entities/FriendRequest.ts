import { friendRequestStatus } from 'libs/api/src/lib/constants/friendRequestStatus'
import { IUser } from 'libs/api/src/lib/entities/User'

export interface IFriendRequest {
  id: string
  sender: IUser
  dateSent: Date
  receiver: IUser
  dateResponded: Date
  status: friendRequestStatus
}
