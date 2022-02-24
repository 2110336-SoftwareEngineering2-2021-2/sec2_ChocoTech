import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core'

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
  status!: ScheduleStatus

  @Property()
  coinOnHold: number

  @Property()
  meetingProviderId: string
}

export enum ScheduleStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  ENDED = 'ended',
  REVIEWED = 'reviewed',
  CANCELED = 'canceled',
}
