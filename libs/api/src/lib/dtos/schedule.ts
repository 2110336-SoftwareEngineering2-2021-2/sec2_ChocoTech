import { ScheduleStatus } from '@libs/api'
import { ApiProperty } from '@nestjs/swagger'

export class ScheduleMeResponseDTO {
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

  @ApiProperty()
  status!: ScheduleStatus

  @ApiProperty()
  coinOnHold: number

  @ApiProperty()
  meetingProviderId: string
}
