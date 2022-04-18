import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

import { Review } from '@backend/entities/Review'
import { Session } from '@backend/entities/Session'
import { ReviewController } from '@backend/review/review.controller'
import { ReviewService } from '@backend/review/review.service'

@Module({
  imports: [MikroOrmModule.forFeature([Review, Session])],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
