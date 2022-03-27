import { IUser } from '@libs/api'
import { ISession } from '@libs/api'

export interface IReview {
  id: number
  session: ISession
  user: IUser
  content: string
  rating: number
}
