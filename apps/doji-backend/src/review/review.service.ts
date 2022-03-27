import { Review } from '@backend/entities/Review'
import { ReviewCreationRequestDTO } from '@backend/review/review.dto'
import { IUserReference } from '@libs/api'
import { EntityRepository, UniqueConstraintViolationException } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable, UnprocessableEntityException } from '@nestjs/common'

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(Review) private readonly reviewRepo: EntityRepository<Review>) {}

  async createReview(dto: ReviewCreationRequestDTO, userRef: IUserReference) {
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
