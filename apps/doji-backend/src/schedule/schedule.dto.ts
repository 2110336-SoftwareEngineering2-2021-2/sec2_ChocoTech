import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class ScheduleDeleteParticipantRequest {
  @ApiProperty()
  @IsNumber()
  scheduleId: number

  @ApiProperty()
  @IsString()
  username: string
}

export class ScheduleReference {
  @ApiProperty()
  @IsNumber()
  scheduleId: number
}
