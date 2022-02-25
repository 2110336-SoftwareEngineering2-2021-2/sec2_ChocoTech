import { IUser } from '@libs/api'
import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core'
import { UserRole } from 'libs/api/src/lib/constants/userRole'

@Entity()
export class User implements IUser {
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

  @Enum(() => UserRole)
  @Property({ default: UserRole.USER })
  role: UserRole

  @Property({ nullable: true })
  firstName?: string

  @Property({ nullable: true })
  lastName?: string

  @Property({ nullable: true })
  location?: string

  @Property({ nullable: true })
  omiseCustomerToken?: string
}
