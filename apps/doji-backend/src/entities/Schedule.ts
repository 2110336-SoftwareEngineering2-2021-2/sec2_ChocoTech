import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core'

export enum ScheduleStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  ENDED = 'ended',
  REVIEWED = 'reviewed',
  CANCELED = 'canceled',
}

@Entity()
export class Schedule {
  @PrimaryKey()
  id!: number

  @Property()
  startTime: Date = new Date()

  @Property()
  duration: number

  @Property()
  topic: string

  @Property()
  fee: number

  @Enum(() => ScheduleStatus)
  @Property({ default: ScheduleStatus.PENDING })
  status: ScheduleStatus = ScheduleStatus.PENDING

  @Property()
  coinOnHold: number

  @Property()
  meetingProviderId: string
}
