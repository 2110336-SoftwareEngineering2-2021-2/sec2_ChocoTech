import { CurrentUser, UserAuthGuard } from '@backend/auth/user.guard'
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

  @Get('/:sessionId')
  async getService(@Param('sessionId') sessionId: number): Promise<ReviewAverageRatingDTO> {
    return await this.reviewService.getReviewAverageRatingById(sessionId)
  }
}
