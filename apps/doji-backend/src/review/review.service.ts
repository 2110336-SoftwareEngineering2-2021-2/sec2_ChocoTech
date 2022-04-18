import { EntityRepository, UniqueConstraintViolationException } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common'

import { Review } from '@backend/entities/Review'
import { Session } from '@backend/entities/Session'
import { User } from '@backend/entities/User'
import { ReviewCreationRequestDTO } from '@backend/review/review.dto'
import { IUserReference } from '@backend/types'

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private readonly reviewRepo: EntityRepository<Review>,
    @InjectRepository(Session) private readonly sessionRepo: EntityRepository<Session>,
  ) {}

  async createReview(dto: ReviewCreationRequestDTO, userRef: IUserReference) {
    const session = await this.sessionRepo.findOne({ id: dto.sessionId })
    if (!session) {
      throw new NotFoundException('Session not found')
    }
    const newReview = new Review()
    newReview.session = session
    newReview.content = dto.content
    newReview.rating = dto.rating
    newReview.user = await userRef.getUser()
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

  async getAllReviews(sessionId: string) {
    const reviewList = await this.reviewRepo.find(
      {
        session: { id: sessionId },
      },
      {
        populate: ['session'],
      },
    )
    return reviewList
  }
  async reportReview(rid: string, userRef: IUserReference) {
    const user = await userRef.getUser()
    const review = await this.reviewRepo.findOne({ id: rid })
    if (!review) {
      throw new NotFoundException('Review not found')
    }
    await review.reportByUser.init()
    review.reportByUser.add(user as User)
    this.reviewRepo.flush()

    return
  }
}
