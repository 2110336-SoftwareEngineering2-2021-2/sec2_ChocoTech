import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class WorkHistoryRequest {
  // @ApiProperty()
  // @IsString()
  // expertUserName: string

  @ApiProperty()
  @IsString()
  topic: string

  @ApiProperty()
  @IsString()
  description: string
}
