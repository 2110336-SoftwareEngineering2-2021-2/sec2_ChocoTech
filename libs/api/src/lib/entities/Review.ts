import { IUser } from '@libs/api'
import { ISession } from 'libs/api/src/lib/entities/Session'

export interface IReview {
  id: string
  rating: number
  content: string
  user: IUser
  session: ISession
  reportByUser: IUser[]
  createdAt: Date
}
