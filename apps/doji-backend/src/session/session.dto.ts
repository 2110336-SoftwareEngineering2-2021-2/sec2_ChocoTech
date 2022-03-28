import { ReviewStatResponseDTO } from '@backend/review/review.dto'
import {
  IGetServiceByNameAndExpertUsernameDTO,
  IPublicSessionReviewResponseDTO,
  IScheduleSessionDTO,
  IServiceInformationResponseDTO,
  ISessionInformationResponseDTO,
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
export class ServiceInformationDTO implements IServiceInformationResponseDTO {
  firstname: string
  lastname: string
  title: string
  description: string
  fee: number
}

export class DeleteSessionParticipantRequestDTO {
  @ApiProperty()
  @IsString()
  sessionId: string
}

export class SessionInformationResponseDTO implements ISessionInformationResponseDTO {
  @ApiProperty()
  id: string

  @ApiProperty()
  reviews: IPublicSessionReviewResponseDTO[]

  @ApiProperty()
  reviewStat: ReviewStatResponseDTO
}

export class PublicSessionReviewDTO implements IPublicSessionReviewResponseDTO {
  @ApiProperty()
  id: string

  @ApiProperty()
  rating: number

  @ApiProperty()
  authorName: string

  @ApiProperty()
  content: string

  @ApiProperty()
  createdAt: Date
}
