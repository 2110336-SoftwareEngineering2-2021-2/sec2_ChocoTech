import { IUser } from '@libs/api'
import { Collection, Entity, Enum, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core'

import { Review } from '../entities/Review'
import { Session } from '../entities/Session'

export enum UserRole {
  EXPERT = 'expert',
  USER = 'user',
}

@Entity()
export class User implements IUser {
  @PrimaryKey()
  username: string

  @Property({ hidden: true })
  passwordHash: string

  @Property()
  displayName: string

  @Property()
  coinBalance: number = 0

  @Property()
  onlineStatus: boolean = false

  @Property({ unique: true })
  email: string

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

  @ManyToMany(() => Session, (session) => session.participants)
  sessions = new Collection<Session>(this)

  @ManyToMany(() => Review, (review) => review.reportByUser)
  reviews = new Collection<Review>(this)

  // @ManyToOne({ nullable: true })
  // verifiedByAdmin!: Admin
}
