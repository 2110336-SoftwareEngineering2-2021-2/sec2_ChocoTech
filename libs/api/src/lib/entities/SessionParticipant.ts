import { ISession, IUser } from '@libs/api'

export interface ISessionParticipant {
  session: ISession
  user: IUser
}
