import { CurrentUser, UserAuthGuard } from '@backend/auth/user.guard'
import { Review } from '@backend/entities/Review'
import { ReviewCreationRequestDTO } from '@backend/review/review.dto'
import { ReviewService } from '@backend/review/review.service'
import { IUserReference } from '@libs/api'
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiCookieAuth } from '@nestjs/swagger'

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
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  async getAllReview(@Param('sessionId') sessionId: string): Promise<Review[]> {
    return await this.reviewService.getAllReviews(sessionId)
  }

  @Post('report/:rid')
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  async report(@Param('rid') rid: number, @CurrentUser() user: IUserReference) {
    await this.reviewService.reportReview(rid, user)
  }
}
