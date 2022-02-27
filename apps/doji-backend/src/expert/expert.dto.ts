import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class ExpertApplicationRequest {
  @ApiProperty()
  @IsString()
  field: string

  @ApiProperty()
  @IsString()
  desc: string
}
