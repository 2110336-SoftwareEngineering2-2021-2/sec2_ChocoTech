import { User } from '@backend/entities/User'
import { IFriendRequest } from '@libs/api'
import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { randomUUID } from 'crypto'

export enum friendRequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  CANCELED = 'cancelled',
  REJECTED = 'rejected',
}

@Entity()
export class FriendRequest implements IFriendRequest {
  @PrimaryKey()
  id: string

  @ManyToOne((user) => user.receivedFriendRequest)
  sender: User

  @Property()
  dateSent: Date

  @ManyToOne((user) => user.sentFriendRequest)
  receiver: User

  @Property()
  dateResponded: Date

  @Enum(() => friendRequestStatus)
  @Property({ default: friendRequestStatus.PENDING })
  status: friendRequestStatus

  constructor() {
    this.id = randomUUID()
    this.dateSent = new Date(Date.now())
  }
}
