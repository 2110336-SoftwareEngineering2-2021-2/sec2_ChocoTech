import { ISchedule } from '@libs/api'
import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core'
import { randomUUID } from 'crypto'

import { Session } from './Session'
import { User } from './User'

export enum ScheduleStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  ENDED = 'ended',
  REVIEWED = 'reviewed',
  CANCELED = 'canceled',
}

@Entity()
export class Schedule implements ISchedule {
  @PrimaryKey()
  id: string = randomUUID()

  @ManyToOne(() => Session)
  session: Session

  @ManyToOne(() => User)
  creator: User

  @Property()
  coinOnHold: number

  @Enum(() => ScheduleStatus)
  @Property({ default: ScheduleStatus.PENDING, nullable: true })
  status: ScheduleStatus = ScheduleStatus.PENDING

  /**
   * Duration in hours
   */
  @Property()
  duration: number

  @Property()
  startTime: Date

  @ManyToMany(() => User, 'schedules', { owner: true })
  participants = new Collection<User>(this)

  @Property({ nullable: true })
  meetId?: string

  @Property({ nullable: true })
  meetUrl?: string
}
