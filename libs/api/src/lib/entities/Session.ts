import { IReview, IUser } from '@libs/api'

export interface ISession {
  id: string
  fee: number
  owner: IUser
  topic: string
  description: string
  reviews: IReview[]
}
