import { ICreateSessionRequestDTO, IScheduleSessionDTO } from '@libs/api'
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
