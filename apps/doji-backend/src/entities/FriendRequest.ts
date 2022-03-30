import { User } from '@backend/entities/User'
import { IFriendRequest } from '@libs/api'
import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { randomUUID } from 'crypto'

export enum friendRequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  CANCELLED = 'cancelled',
  REJECTED = 'rejected',
  ENDED = 'ended',
}

@Entity()
export class FriendRequest implements IFriendRequest {
  @PrimaryKey()
  id: string

  @ManyToOne(() => User)
  sender: User

  @Property()
  dateSent: Date

  @ManyToOne(() => User)
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
