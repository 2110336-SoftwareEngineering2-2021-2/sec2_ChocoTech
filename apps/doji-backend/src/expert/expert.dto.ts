import { ReviewStatDTO } from '@backend/review/review.dto'
import {
  IExpertApplicationListItemDTO,
  IExpertApplicationQueryDTO,
  IExpertInfoDTO,
  IReviewStat,
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
}

export class ExpertInfoDTO implements IExpertInfoDTO {
  @ApiProperty()
  reviewStat: ReviewStatDTO
}
