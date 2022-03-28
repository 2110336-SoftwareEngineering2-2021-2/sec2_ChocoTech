import { ISession } from 'libs/api/src/lib/entities/Session'
import { IUser } from 'libs/api/src/lib/entities/User'

import { ScheduleStatus } from '../constants/sessionStatus'

export interface ISchedule {
  id: string
  session: ISession
  creator: IUser
  coinOnHold: number
  status: ScheduleStatus
  /**
   * Duration in hours
   */
  duration: number
  startTime: Date
  meetUrl?: string
}
