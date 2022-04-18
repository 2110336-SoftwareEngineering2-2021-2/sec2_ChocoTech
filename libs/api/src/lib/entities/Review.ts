import { ISession } from 'libs/api/src/lib/entities/Session'

import { IUser } from '@libs/api'

export interface IReview {
  id: string
  rating: number
  content: string
  user: IUser
  session: ISession
  reportByUser: IUser[]
  createdAt: Date
}
