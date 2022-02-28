import { IAdmin } from '@libs/api'
import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class Admin implements IAdmin {
  @PrimaryKey()
  username: string

  @Property()
  passwordHash: string

  //   @OneToMany(() => User, (user) => user.verifiedByAdmin)
  //   aprovedExpert = new Collection<User>(this)
}
