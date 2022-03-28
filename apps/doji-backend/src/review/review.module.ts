import { Review } from '@backend/entities/Review'
import { ReviewController } from '@backend/review/review.controller'
import { ReviewService } from '@backend/review/review.service'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

@Module({
  imports: [MikroOrmModule.forFeature([Review])],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
