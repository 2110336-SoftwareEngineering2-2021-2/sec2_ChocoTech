import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core'
import { randomUUID } from 'crypto'

import { Review } from './Review'
import { User } from './User'

@Entity()
export class Session {
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
  reviews = new Collection<Review>(this)
}
