import { Entity, ManyToOne } from '@mikro-orm/core'

import { User } from './User'

@Entity()
export class ExpertApp {
  @ManyToOne({ primary: true })
  user: User
}
