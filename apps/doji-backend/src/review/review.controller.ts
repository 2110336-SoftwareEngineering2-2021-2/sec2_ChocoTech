import { CurrentUser, UserAuthGuard } from '@backend/auth/user.guard'
import { Review } from '@backend/entities/Review'
import { ReviewAverageRatingDTO, ReviewCreationRequestDTO } from '@backend/review/review.dto'
import { ReviewService } from '@backend/review/review.service'
import { IUserReference } from '@libs/api'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  async create(@Body() dto: ReviewCreationRequestDTO, @CurrentUser() user: IUserReference) {
    return await this.reviewService.createReview(dto, user)
  }

  @Get('avgRating/:sessionId')
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  async getAverageRating(@Param('sessionId') sessionId: number): Promise<ReviewAverageRatingDTO> {
    return await this.reviewService.getReviewAverageRatingById(sessionId)
  }

  @Get('all/:sessionId')
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  async getAllReview(@Param('sessionId') sessionId: number): Promise<Review[]> {
    return await this.reviewService.getAllReview(sessionId)
  }
}
