import { IUser } from '@libs/api'
import { IService } from 'libs/api/src/lib/entities/Service'

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
  creator: IUser
  service: IService
}
