import { IUser } from '@libs/api'
import { ISession } from 'libs/api/src/lib/entities/Session'

export interface IReview {
  id: string
  session: ISession
  user: IUser
  content: string
  rating: number
}
