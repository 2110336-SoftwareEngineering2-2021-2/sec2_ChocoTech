import { BaseEntity, Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class User {
  @PrimaryKey()
  username: string

  @Property()
  passwordHash: string

  @Property()
  displayName: string

  @Property()
  coinBalance: number = 0

  @Property()
  onlineStatus: boolean = false

  @Property({ unique: true })
  email: string

  @Property()
  registerationDate: Date = new Date()
}
