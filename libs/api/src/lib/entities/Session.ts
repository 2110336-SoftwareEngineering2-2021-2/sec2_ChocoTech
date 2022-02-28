import { SessionStatus } from '../constants/sessionStatus'

export interface ISession {
  id: number
  meetingProviderId: string
  fee: number
  coinOnHold: number
  status: SessionStatus
  topic: string
  duration: number
  startTime: Date
  soruceId: string
  creatorId: string
  expertId: string
  serviceName: string
}
