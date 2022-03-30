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
}
