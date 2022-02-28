import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class WorkHistoryRequest {
  @ApiProperty()
  @IsString()
  topic: string

  @ApiProperty()
  @IsString()
  description: string
}

export class EditWorkHistoryRequest {
  @ApiProperty()
  @IsString()
  id: string

  @ApiProperty()
  @IsString()
  topic: string

  @ApiProperty()
  @IsString()
  description: string
}
