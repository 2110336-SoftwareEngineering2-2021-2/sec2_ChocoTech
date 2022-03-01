import { IScheduleSessionDTO } from '@libs/api'
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNumber, IsString } from 'class-validator'

export class ScheduleSessionDTO implements IScheduleSessionDTO {
  @ApiProperty()
  @IsString()
  expertUsername: string
  @ApiProperty()
  @IsString()
  serviceName: string
  @ApiProperty()
  @IsNumber()
  duration: number
  @ApiProperty()
  @IsString()
  startTime: Date
  @ApiProperty()
  @IsNumber()
  fee: number
  @ApiProperty()
  @IsArray()
  participantsUsername: string[]
}
