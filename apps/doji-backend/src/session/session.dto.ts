import { Review } from '@backend/entities/Review'
import { ScheduleStatus } from '@backend/entities/Schedule'
import { Session } from '@backend/entities/Session'
import { User } from '@backend/entities/User'
import {
  ICreateSessionRequestDTO,
  IScheduleSessionDTO,
  IScheudleResponseDTO,
  ISession,
} from '@libs/api'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsDate, IsNumber, IsString } from 'class-validator'

export class CreateSessionRequestDTO implements ICreateSessionRequestDTO {
  @ApiProperty()
  @IsString()
  topic: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty()
  @IsNumber()
  fee: number
}

export class ScheduleSessionDTO implements IScheduleSessionDTO {
  @ApiProperty()
  @IsString()
  sessionId: string

  @ApiProperty()
  @IsNumber()
  duration: number

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  startTime: Date

  @ApiProperty()
  @IsArray()
  participantsUsername: string[]

  @ApiProperty()
  @IsNumber()
  coinOnHold: number
}

export class SessionInfoResponseDTO implements Omit<ISession, 'reviews'> {
  id: string
  owner: User
  topic: string
  fee: number
  description: string
  reviews: Review[]
}

export class ScheudleResponseDTO implements IScheudleResponseDTO {
  id: string
  session: Session
  creator: User
  coinOnHold: number
  status: ScheduleStatus
  duration: number
  startTime: Date
  meetId?: string
  meetUrl?: string
  participants: User[]
}
