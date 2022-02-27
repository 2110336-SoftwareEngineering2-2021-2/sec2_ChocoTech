import { IExpertApp } from '@libs/api'
import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class ExpertApp implements IExpertApp {
  @PrimaryKey()
  username: string

  @Property()
  field: string

  @Property()
  desc: string
}
