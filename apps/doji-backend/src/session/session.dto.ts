import {
  IGetServiceByNameAndExpertUsernameDTO,
  IScheduleSessionDTO,
  IServiceInformationDTO,
} from '@libs/api'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsDate, IsNumber, IsString } from 'class-validator'

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
  @IsDate()
  @Type(() => Date)
  startTime: Date
  @ApiProperty()
  @IsNumber()
  fee: number
  @ApiProperty()
  @IsArray()
  participantsUsername: string[]
}
export class GetServiceByNameAndExpertUsernameDTO implements IGetServiceByNameAndExpertUsernameDTO {
  @ApiProperty()
  @IsString()
  expertUsername: string
  @ApiProperty()
  @IsString()
  serviceName: string
}
export class ServiceInformationDTO implements IServiceInformationDTO {
  firstname: string
  lastname: string
  title: string
  description: string
  fee: number
}
