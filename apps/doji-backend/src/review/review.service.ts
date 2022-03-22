import { Review } from '@backend/entities/Review'
import { Session } from '@backend/entities/Session'
import { ReviewCreationRequestDTO } from '@backend/review/review.dto'
import { IUserReference } from '@libs/api'
import { EntityRepository, UniqueConstraintViolationException } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable, UnprocessableEntityException } from '@nestjs/common'

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private readonly reviewRepo: EntityRepository<Review>,
    @InjectRepository(Session) private readonly sessionRepo: EntityRepository<Session>,
  ) {}

  async createReview(dto: ReviewCreationRequestDTO, userRef: IUserReference) {
    const user = await userRef.getUser()
    const session = await this.sessionRepo.findOne({ id: dto.sessionId })
    if (!session) return null
    const newReview = new Review()
    newReview.user = user
    newReview.session = session
    newReview.content = dto.content
    newReview.rating = dto.rating
    try {
      await this.reviewRepo.persistAndFlush(newReview)
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new UnprocessableEntityException('User with this username or email already exist.')
      } else {
        throw e
      }
    }
    return
  }

  async getReviewAverageRatingById(sessionId: number) {
    const session = await this.sessionRepo.findOne({ id: sessionId })
    if (!session) return null
    const reviewList = await this.reviewRepo.find({ session: session })
    const count = reviewList.length
    let sum = 0
    reviewList.forEach((value) => (sum += value.rating))
    const avgRating = new ReviewAverageRatingDTO()
    avgRating.avgRating = sum / count
    return avgRating
  }
}
