import { User } from '@backend/entities/User'
import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { randomUUID } from 'crypto'

export enum FriendRequestStatus {
  PENDING = '0',
  ACCEPTED = '1',
  REJECTED = '2',
  CANCELED = '3',
}

@Entity()
export class FriendRequest {
  @PrimaryKey()
  id: string

  @Property()
  sender: User

  @Property()
  sendDate: Date

  @Property()
  receiver: User

  @Property({ nullable: true })
  respondDate?: Date

  @Enum(() => FriendRequestStatus)
  @Property({ default: FriendRequestStatus.PENDING })
  status: FriendRequestStatus.PENDING

  constructor() {
    this.id = randomUUID()
  }
}
