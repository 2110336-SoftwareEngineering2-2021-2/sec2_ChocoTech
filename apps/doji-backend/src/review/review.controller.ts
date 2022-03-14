import { UserReference } from '@backend/auth/auth.service'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import { ReviewCreationRequestDTO } from '@backend/review/review.dto'
import { ReviewService } from '@backend/review/review.service'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  async create(@Body() dto: ReviewCreationRequestDTO, @CurrentUser() user: UserReference) {
    await this.reviewService.createReview(dto, user)
  }
}
