import { IWorkHistory } from '@libs/api'
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { randomUUID } from 'crypto'

import { User } from './User'

@Entity()
export class WorkHistory implements IWorkHistory {
  @PrimaryKey()
  id: string = randomUUID()

  @ManyToOne({ primary: true })
  expert: User

  @Property()
  topic: string

  @Property()
  description: string
}
