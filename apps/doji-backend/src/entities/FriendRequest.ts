import { User } from '@backend/entities/User'
import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { randomUUID } from 'crypto'

export enum friendRequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  CANCELED = 'cancelled',
  REJECTED = 'rejected',
}

@Entity()
export class FriendRequest {
  @PrimaryKey()
  id: string

  @ManyToOne((user) => user.receivedFriendRequest)
  sender: User

  @Property()
  dateSent: Date

  @ManyToOne((user) => user.sentFriendRequest)
  receiver: User

  @Property()
  dateReceived: Date

  @Enum(() => friendRequestStatus)
  @Property({ default: friendRequestStatus.PENDING })
  status: friendRequestStatus

  constructor() {
    this.id = randomUUID()
    this.dateSent = new Date(Date.now())
  }
}
