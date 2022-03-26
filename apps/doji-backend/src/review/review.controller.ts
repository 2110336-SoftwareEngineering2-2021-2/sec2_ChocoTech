import { CurrentUser, UserAuthGuard } from '@backend/auth/user.guard'
import { ReviewCreationRequestDTO } from '@backend/review/review.dto'
import { ReviewService } from '@backend/review/review.service'
import { IUserReference } from '@libs/api'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  async create(@Body() dto: ReviewCreationRequestDTO, @CurrentUser() user: IUserReference) {
    await this.reviewService.createReview(dto, user)
  }
}
