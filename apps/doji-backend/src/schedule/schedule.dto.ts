import { IScheduleMeResponseDTO, ScheduleStatus } from '@libs/api'
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

export class ScheduleMeResponseDTO implements IScheduleMeResponseDTO {
  @ApiProperty()
  id!: number

  @ApiProperty()
  startTime: Date

  @ApiProperty()
  duration: number

  @ApiProperty()
  topic: string

  @ApiProperty()
  fee: number

  @ApiProperty({ enum: Object.values(ScheduleStatus), default: ScheduleStatus.PENDING })
  status: ScheduleStatus

  @ApiProperty()
  coinOnHold: number

  @ApiProperty()
  meetingProviderId: string
}
