import { ReviewStatResponseDTO } from '@backend/review/review.dto'
import {
  IExpertApplicationListItemDTO,
  IExpertApplicationQueryDTO,
  IExpertInfoResponseDTO,
  IReviewStatResponseDTO,
} from '@libs/api'
import { ApiBody, ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class ExpertApplicationRequest {
  @ApiProperty()
  @IsString()
  field: string

  @ApiProperty()
  @IsString()
  desc: string
}

export class ExpertApplicationListItemDTO implements IExpertApplicationListItemDTO {
  @ApiProperty()
  @IsString()
  firstname: string
  @ApiProperty()
  @IsString()
  lastname: string
  @ApiProperty()
  @IsString()
  username: string
  @ApiProperty()
  @IsString()
  imageURL: string
}

export class ExpertInfoResponseDTO implements IExpertInfoResponseDTO {
  @ApiProperty()
  reviewStat: ReviewStatResponseDTO
}
