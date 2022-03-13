import { IUser, IWorkHistory } from '@libs/api'
import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

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
