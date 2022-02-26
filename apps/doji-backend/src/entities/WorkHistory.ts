import { IWorkHistory } from '@libs/api'
import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 as uuidv4 } from 'uuid'

@Entity()
export class WorkHistory implements IWorkHistory {
  @PrimaryKey()
  id: string = uuidv4()

  @PrimaryKey()
  expertUserName: string

  @Property()
  topic: string

  @Property()
  description: string

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date()
}
