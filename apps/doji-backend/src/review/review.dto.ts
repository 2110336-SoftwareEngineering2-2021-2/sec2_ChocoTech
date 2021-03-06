import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

import { IReviewCreationRequestDTO, IReviewStatResponseDTO } from '@libs/api'

export class ReviewCreationRequestDTO implements IReviewCreationRequestDTO {
  @ApiProperty()
  @IsNumber()
  rating: number

  @ApiProperty()
  @IsString()
  content: string

  @ApiProperty()
  @IsString()
  sessionId: string
}

export class ReviewStatResponseDTO implements IReviewStatResponseDTO {
  @ApiProperty()
  '1': number
  @ApiProperty()
  '2': number
  @ApiProperty()
  '3': number
  @ApiProperty()
  '4': number
  @ApiProperty()
  '5': number
  @ApiProperty()
  avg: number
  @ApiProperty()
  count: number
}
