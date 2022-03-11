import { User } from '@backend/entities/User'
import { ISession, SessionStatus } from '@libs/api'
import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class DeleteSessionParticipantRequest {
  @ApiProperty()
  @IsNumber()
  SessionId: number

  @ApiProperty()
  @IsString()
  username: string
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
