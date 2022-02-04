import { BaseEntity, Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class User {
  @PrimaryKey()
  username: string

  @Property()
  passwordHash: string

  @Property()
  display_name: string

  @Property()
  coin_balance: number = 0

  @Property()
  online_status: boolean = false

  @Property()
  email: string

  @Property()
  registeration_date: Date = new Date();
}
