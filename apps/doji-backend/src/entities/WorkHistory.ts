import { IWorkHistory } from '@libs/api'
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { uuid } from 'uuidv4'

import { User } from '../entities/User'

@Entity()
export class WorkHistory implements IWorkHistory {
  @PrimaryKey()
  id: string = uuid()

  @ManyToOne({ primary: true })
  expert: User

  @Property()
  topic: string

  @Property()
  description: string
}
