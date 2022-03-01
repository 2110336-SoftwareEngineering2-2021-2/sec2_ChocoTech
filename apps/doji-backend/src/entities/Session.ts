import { ISession } from '@libs/api'
import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core'

import { Service } from '../entities/Service'
import { User } from '../entities/User'

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
  @Property()
  status: SessionStatus
  @Property()
  topic: string
  @Property()
  duration: number
  @Property()
  startTime: Date
  @Property()
  soruceId: string
  @ManyToOne()
  creator: User
  @ManyToOne()
  service: Service
}
