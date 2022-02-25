import { Entity, PrimaryKey, PrimaryKeyType } from '@mikro-orm/core'

@Entity()
export class User_Schedule {
  @PrimaryKey()
  username: string

  @PrimaryKey()
  scheduleId: number;

  [PrimaryKeyType]?: [string, number]
}
