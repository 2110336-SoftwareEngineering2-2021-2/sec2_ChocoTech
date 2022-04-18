import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

import { ReviewStatResponseDTO } from '@backend/review/review.dto'

import { IExpertApplicationListItemDTO, IExpertInfoResponseDTO } from '@libs/api'

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
  displayName: string
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
