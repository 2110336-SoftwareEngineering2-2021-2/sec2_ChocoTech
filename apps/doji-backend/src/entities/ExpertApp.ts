import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class ExpertApp {
  @PrimaryKey()
  username: string

  @Property()
  field: string

  @Property()
  desc: string
}
