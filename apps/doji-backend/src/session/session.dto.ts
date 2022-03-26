import { SessionStatus } from '@backend/entities/Session'
import { User } from '@backend/entities/User'
import { ReviewStatResponseDTO } from '@backend/review/review.dto'
import {
  IGetServiceByNameAndExpertUsernameDTO,
  IPublicSessionReviewDTO as IPublicSessionReviewResponseDTO,
  IReviewStat,
  IScheduleSessionDTO,
  IService,
  IServiceInformationDTO,
  ISession,
  ISessionInformationDTO as ISessionInformationResponseDTO,
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

export class DeleteSessionParticipantRequest {
  @ApiProperty()
  @IsNumber()
  sessionId: number
}

export class SessionDTO implements ISession {
  @ApiProperty()
  id: number

  @ApiProperty()
  startTime: Date

  @ApiProperty()
  duration: number

  @ApiProperty()
  topic: string

  @ApiProperty()
  fee: number

  @ApiProperty({ enum: Object.values(SessionStatus), default: SessionStatus.PENDING })
  status: SessionStatus = SessionStatus.PENDING

  @ApiProperty()
  coinOnHold: number

  @ApiProperty()
  meetingProviderId: string

  @ApiProperty()
  soruceId: string

  @ApiProperty()
  creator: User

  @ApiProperty()
  sourceId: string

  @ApiProperty()
  service: IService
}

export class SessionInformationResponseDTO implements ISessionInformationResponseDTO {
  @ApiProperty()
  id: number

  @ApiProperty()
  reviews: IPublicSessionReviewResponseDTO[]

  @ApiProperty()
  reviewStat: ReviewStatResponseDTO
}

export class PublicSessionReviewDTO implements IPublicSessionReviewResponseDTO {
  @ApiProperty()
  id: number

  @ApiProperty()
  rating: number

  @ApiProperty()
  authorName: string

  @ApiProperty()
  content: string

  @ApiProperty()
  createdAt: Date
}
