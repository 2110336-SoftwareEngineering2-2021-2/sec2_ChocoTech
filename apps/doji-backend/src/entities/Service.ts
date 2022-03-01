import { IService } from '@libs/api'
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'

import { User } from '../entities/User'

@Entity()
export class Service implements IService {
  @ManyToOne({ primary: true })
  expert: User
  @PrimaryKey()
  name: string
  @Property()
  fee: number
  @Property()
  description: string
}
