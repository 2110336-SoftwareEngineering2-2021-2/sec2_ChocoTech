import { IUser } from '@libs/api'
import { IService } from 'libs/api/src/lib/entities/Service'

import { SessionStatus } from '../constants/sessionStatus'

export interface ISession {
  id: string
  meetUrl: string
  fee: number
  coinOnHold: number
  status: SessionStatus
  topic: string
  /**
   * Duration in hours
   */
  duration: number
  startTime: Date
  creator: IUser
  service: IService
}
