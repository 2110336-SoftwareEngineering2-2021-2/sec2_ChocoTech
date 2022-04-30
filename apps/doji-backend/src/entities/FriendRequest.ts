import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { randomUUID } from 'crypto'

import { User } from '@backend/entities/User'

export enum FriendRequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  UNFRIENDED = 'unfriended',
}
@Entity()
export class FriendRequest {
  @PrimaryKey()
  id: string

  @Property()
  dateSent: Date

  @ManyToOne()
  sender: User

  @ManyToOne()
  receiver: User

  @Property({ nullable: true })
  dateRespond?: Date

  @Property({ nullable: true })
  dateEnded?: Date

  @Property()
  status: FriendRequestStatus

  constructor(sender: User, receiver: User) {
    this.id = randomUUID()
    this.dateSent = new Date()
    this.sender = sender
    this.receiver = receiver
    this.status = FriendRequestStatus.PENDING
  }
}
