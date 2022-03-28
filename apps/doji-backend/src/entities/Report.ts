import { Entity, ManyToOne, Property } from '@mikro-orm/core'

import { User } from '../entities/User'

@Entity()
export class Report {
  @ManyToOne({ primary: true })
  reporter: User

  @ManyToOne({ primary: true })
  expert: User

  @Property({ default: new Date().toISOString() })
  createAt: Date = new Date()
}
