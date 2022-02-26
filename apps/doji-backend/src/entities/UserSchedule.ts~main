import { IUserSchedule } from '@libs/api'
import { Entity, PrimaryKey, PrimaryKeyType } from '@mikro-orm/core'

@Entity()
export class UserSchedule implements IUserSchedule {
  @PrimaryKey()
  username: string

  @PrimaryKey()
  scheduleId: number;

  [PrimaryKeyType]?: [string, number]
}
