import { User } from '@backend/entities/User'
import { ISession, SessionStatus } from '@libs/api'
import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class DeleteSessionParticipantRequest {
  @ApiProperty()
  @IsNumber()
  SessionId: number
}

export class SessionDTO implements ISession {
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

  @ApiProperty({ enum: Object.values(SessionStatus), default: SessionStatus.PENDING })
  status: SessionStatus

  @ApiProperty()
  coinOnHold: number

  @ApiProperty()
  meetingProviderId: string

  @ApiProperty()
  soruceId: string

  @ApiProperty()
  creator: User
}
