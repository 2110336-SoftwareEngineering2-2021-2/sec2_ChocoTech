import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 } from 'uuid'

@Entity()
export class WorkHistory {
  @PrimaryKey()
  uuid: string = v4()

  @PrimaryKey()
  expertUserName: string

  @Property()
  topic: string

  @Property()
  description: string

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date()
}
