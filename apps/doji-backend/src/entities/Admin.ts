import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class Admin {
  @PrimaryKey()
  username: string

  @Property()
  passwordHash: string

  //   @OneToMany(() => User, (user) => user.verifiedByAdmin)
  //   aprovedExpert = new Collection<User>(this)

  toJSON() {
    return {
      username: this.username,
      passwordHash: this.passwordHash,
    }
  }
}
