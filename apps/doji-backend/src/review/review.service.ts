import { UserReference } from '@backend/auth/auth.service'
import { Review } from '@backend/entities/Review'
import { ReviewCreationRequestDTO } from '@backend/review/review.dto'
import { EntityRepository, UniqueConstraintViolationException } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable, UnprocessableEntityException } from '@nestjs/common'

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(Review) private readonly reviewRepo: EntityRepository<Review>) {}

  async createReview(dto: ReviewCreationRequestDTO, userRef: UserReference) {
    const user = await userRef.getUser()
    const newReview = new Review()
    newReview.content = dto.content
    newReview.rating = dto.rating
    try {
      await this.reviewRepo.persistAndFlush(newReview) //add to database
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new UnprocessableEntityException('User with this username or email already exist.')
      } else {
        throw e
      }
    }
    return
  }
}
