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

export class updatRequestStatus {
  @ApiProperty()
  @IsString()
  requestStatus: string
}
