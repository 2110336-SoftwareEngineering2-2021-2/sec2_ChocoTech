import { ISession, SessionStatus } from '@libs/api'
import { Entity } from '@mikro-orm/core'

@Entity()
export class Session implements ISession {
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
