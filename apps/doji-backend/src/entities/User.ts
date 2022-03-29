import { FriendRequest } from '@backend/entities/FriendRequest'
import { ISchedule, IUser } from '@libs/api'
import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core'

import { Review } from '../entities/Review'
import { Schedule } from './Schedule'

export enum UserRole {
  EXPERT = 'expert',
  USER = 'user',
}

@Entity()
export class User implements IUser {
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
  schedules = new Collection<ISchedule>(this)

  @ManyToMany(() => Review, (review) => review.reportByUser)
  reviews = new Collection<Review>(this)

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.receiver)
  sentFriendRequest = new Collection<User>(this)

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.sender)
  receivedFriendRequest = new Collection<User>(this)

  // @ManyToOne({ nullable: true })
  // verifiedByAdmin!: Admin
}
