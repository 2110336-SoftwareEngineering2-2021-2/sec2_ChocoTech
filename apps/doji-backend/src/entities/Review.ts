import { IReview } from '@libs/api'
import { Collection, Entity, ManyToMany, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { randomUUID } from 'crypto'

import { User } from '../entities/User'
import { Session } from './Session'

@Entity()
export class Review implements IReview {
  @PrimaryKey()
  id: string = randomUUID()

  @Property()
  rating: number

  @Property()
  content: string

  @ManyToOne(() => User)
  user: User

  @ManyToOne(() => Session)
  session: Session

  @ManyToMany(() => User, 'reviews', { owner: true })
  reportByUser = new Collection<User>(this)

  @Property({ default: new Date().toISOString() })
  createdAt: Date = new Date()
}
