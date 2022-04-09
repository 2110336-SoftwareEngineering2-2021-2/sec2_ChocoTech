import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsDate, IsEnum, IsNumber, IsString } from 'class-validator'

import { Review } from '@backend/entities/Review'
import { ScheduleStatus } from '@backend/entities/Schedule'

import {
  IChangeScheduleStatusRequestDTO,
  ICreateSessionRequestDTO,
  IScheduleResponseDTO,
  IScheduleSessionDTO,
  ISession,
  IUser,
} from '@libs/api'

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
  owner: IUser
  topic: string
  fee: number
  description: string
  reviews: Review[]
}

export class ScheudleResponseDTO implements IScheduleResponseDTO {
  id: string
  session: ISession
  creator: IUser
  coinOnHold: number
  status: ScheduleStatus
  duration: number
  startTime: Date
  meetId?: string
  meetUrl?: string
  participants: IUser[]
}
export class ChangeScheduleStatusRequestDTO implements IChangeScheduleStatusRequestDTO {
  @ApiProperty()
  @IsEnum(ScheduleStatus)
  status: ScheduleStatus
}
