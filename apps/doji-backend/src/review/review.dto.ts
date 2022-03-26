import { IReviewCreationRequestDTO } from '@libs/api'
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
