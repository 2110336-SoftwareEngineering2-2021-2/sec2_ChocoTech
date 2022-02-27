import { IWorkHistory } from '@libs/api'
import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 as uuidv4 } from 'uuid'

@Entity()
export class WorkHistory implements IWorkHistory {
  @PrimaryKey()
  id: string = uuidv4()

  @Property()
  expertUserName: string

  @Property()
  topic: string

  @Property()
  description: string
}
