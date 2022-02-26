import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class EditWorkHistoryRequest {
  @ApiProperty()
  @IsString()
  topic: string

  @ApiProperty()
  @IsString()
  description: string
}
