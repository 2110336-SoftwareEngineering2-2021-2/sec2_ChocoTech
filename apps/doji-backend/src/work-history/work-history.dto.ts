import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

import { IUser, IWorkHistory } from '@libs/api'

export class WorkHistoryRequestDTO implements IWorkHistory {
  @ApiProperty()
  @IsString()
  topic: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty()
  id!: string

  @ApiProperty()
  expert!: IUser
}
