import { Entity, PrimaryKey } from '@mikro-orm/core'

import { User } from '@backend/entities/User'

@Entity()
export class Friendship {
  @PrimaryKey()
  id: string

  @PrimaryKey()
  user1: User

  @PrimaryKey()
  user2: User

  constructor(id: string, user1: User, user2: User) {
    this.id = id
    this.user1 = user1
    this.user2 = user2
  }
}
