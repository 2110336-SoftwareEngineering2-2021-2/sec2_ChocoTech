import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core'

import { FriendRequest } from '@backend/entities/FriendRequest'
import { Friendship } from '@backend/entities/Friendship'

import { ChatRoom } from './ChatRoom'
import { Message } from './Message'
import { Review } from './Review'
import { Schedule } from './Schedule'

export enum UserRole {
  EXPERT = 'expert',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryKey()
  username: string

  @Property({ unique: true })
  email: string

  @Property({ hidden: true })
  passwordHash: string

  @Property()
  displayName: string

  @Property()
  coinBalance: number = 0

  @Property()
  onlineStatus: boolean = false

  @Property()
  registerationDate: Date = new Date()

  @Enum(() => UserRole)
  @Property({ default: UserRole.USER })
  role: UserRole = UserRole.USER

  @Property({ nullable: true })
  firstName?: string

  @Property({ nullable: true })
  lastName?: string

  @Property({ nullable: true })
  location?: string

  @Property({ nullable: true })
  omiseCustomerToken?: string

  @Property({ unique: true, nullable: true })
  googleEmail?: string

  @Property({ nullable: true })
  googleRefreshToken?: string

  @Property({ nullable: true })
  profilePictureURL?: string

  @ManyToMany(() => Schedule, (schedule) => schedule.participants)
  schedules = new Collection<Schedule>(this)

  @ManyToMany(() => Review, (review) => review.reportByUser)
  reviews = new Collection<Review>(this)

  @OneToMany(() => Message, (message) => message.author)
  messages = new Collection<Message>(this)

  @ManyToMany(() => ChatRoom, (chatRoom) => chatRoom.participants)
  chatRooms = new Collection<ChatRoom>(this)

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.sender)
  requestSent = new Collection<FriendRequest>(this)

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.receiver)
  requestReceived = new Collection<FriendRequest>(this)

  @OneToMany(() => Friendship, (friendship) => friendship.user1)
  friendship = new Collection<Friendship>(this)

  // @ManyToOne({ nullable: true })
  // verifiedByAdmin!: Admin
  constructor(username: string) {
    this.username = username
  }
}
