import { ISession } from '@libs/api'
import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core'

import { Service } from '../entities/Service'
import { User } from '../entities/User'
import { Review } from './Review'

export enum SessionStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  ENDED = 'ended',
  REVIEWED = 'reviewed',
  CANCELED = 'canceled',
}

@Entity()
export class Session implements ISession {
  @PrimaryKey()
  id!: number

  @Property()
  meetingProviderId: string

  @Property()
  fee: number

  @Property()
  coinOnHold: number

  @Enum(() => SessionStatus)
  @Property({ default: SessionStatus.PENDING, nullable: true })
  status?: SessionStatus = SessionStatus.PENDING

  @Property()
  topic: string

  @Property()
  duration: number

  @Property()
  startTime: Date

  @Property()
  sourceId: string

  @ManyToOne(() => User)
  creator: User

  @ManyToOne(() => Service)
  service: Service

  @ManyToMany(() => User, 'sessions', { owner: true })
  participants = new Collection<User>(this)

  @OneToMany(() => Review, (review) => review.session)
  reviews = new Collection<Review>(this)
}
