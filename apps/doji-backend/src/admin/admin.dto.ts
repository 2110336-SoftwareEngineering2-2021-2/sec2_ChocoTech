import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class ExpertExperienceRequest {
  @ApiProperty()
  @IsString()
  username: string
}
