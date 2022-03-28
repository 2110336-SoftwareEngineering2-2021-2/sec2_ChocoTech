import { Review } from '@backend/entities/Review'
import { IReview, ISession } from '@libs/api'
import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core'
import { randomUUID } from 'crypto'

import { User } from './User'

@Entity()
export class Session implements ISession {
  @PrimaryKey()
  id: string = randomUUID()

  @ManyToOne(() => User, { primary: true })
  owner: User

  @Property()
  topic: string

  @Property()
  fee: number

  @Property()
  description: string

  @OneToMany(() => Review, (review) => review.session)
  reviews = new Collection<IReview>(this)
}
