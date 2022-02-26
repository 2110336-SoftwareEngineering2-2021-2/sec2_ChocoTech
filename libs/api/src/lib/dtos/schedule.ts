import { ScheduleStatus } from '@libs/api'

export interface IScheduleMeResponseDTO {
  id: number
  startTime: Date
  duration: number
  topic: string
  fee: number
  status: ScheduleStatus
  coinOnHold: number
  meetingProviderId: string
}
