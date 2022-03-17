import { IReview } from '@libs/api'
import { Collection, Entity, ManyToMany, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'

import { Session } from '../entities/Session'
import { User } from '../entities/User'

@Entity()
export class Review implements IReview {
  @PrimaryKey()
  id: number

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
}
