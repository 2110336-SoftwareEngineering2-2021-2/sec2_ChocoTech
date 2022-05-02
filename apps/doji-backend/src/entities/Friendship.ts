import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'

import { User } from './User'

@Entity()
export class Friendship {
  @PrimaryKey()
  id: string

  @ManyToOne(() => User, { primary: true })
  user1: User

  @ManyToOne(() => User, { primary: true })
  user2: User

  constructor(id: string, user1: User, user2: User) {
    this.id = id
    this.user1 = user1
    this.user2 = user2
  }
}
