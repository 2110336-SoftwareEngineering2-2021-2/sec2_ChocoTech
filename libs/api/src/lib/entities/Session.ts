import { IReview, IUser } from '@libs/api'
import { Collection } from '@mikro-orm/core'

export interface ISession {
  id: string
  fee: number
  owner: IUser
  topic: string
  description: string
  reviews: Collection<IReview>
}
