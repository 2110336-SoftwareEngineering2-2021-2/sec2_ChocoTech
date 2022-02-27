import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class ExpertRequestDto {
  @ApiProperty()
  @IsString()
  expertUserUsername: string
  @ApiProperty()
  @IsString()
  applicationContent: string
  @ApiProperty()
  @IsString()
  field: string
}

export class updateRequestStatus {
  @ApiProperty({
    description: '3 status of request: pending, accepted, declined',
    example: 'accepted',
  })
  @IsString()
  requestStatus: string
}
