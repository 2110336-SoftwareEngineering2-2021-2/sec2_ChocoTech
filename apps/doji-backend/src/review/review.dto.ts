import { IReviewCreationRequestDTO, IReviewStat } from '@libs/api'
import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class ReviewCreationRequestDTO implements IReviewCreationRequestDTO {
  @ApiProperty()
  @IsString()
  content: string

  @ApiProperty()
  @IsNumber()
  rating: number
}

export class ReviewStatDTO implements IReviewStat {
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