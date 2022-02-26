export interface ISchedule {
  id: number
  startTime: Date
  duration: number
  topic: string
  fee: number
  status: ScheduleStatus
  coinOnHold: number
  meetingProviderId: string
}

export enum ScheduleStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  ENDED = 'ended',
  REVIEWED = 'reviewed',
  CANCELED = 'canceled',
}
