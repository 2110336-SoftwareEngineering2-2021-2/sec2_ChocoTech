import { Entity, ManyToOne, Property } from '@mikro-orm/core'

import { User } from './User'

@Entity()
export class ExpertApp {
  @ManyToOne({ primary: true })
  user: User

  @Property()
  field: string

  @Property()
  desc: string
}
