import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { randomUUID } from 'crypto'

import { User } from './User'

@Entity()
export class WorkHistory {
  @PrimaryKey()
  id: string = randomUUID()

  @ManyToOne({ primary: true })
  expert: User

  @Property()
  topic: string

  @Property()
  description: string
  constructor(expert: User, topic: string, description: string) {
    // console.log(this)
    // console.log(typeof this)
    this.expert = expert
    this.topic = topic
    this.description = description
  }
}
