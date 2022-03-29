import { ISchedule, IUser } from '@libs/api'

export interface ISessionParticipant {
  session: ISchedule
  user: IUser
}
