import { EntityRepository, UniqueConstraintViolationException } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager } from '@mikro-orm/postgresql'
import { Injectable, UnprocessableEntityException } from '@nestjs/common'

import { ExpertApp } from '@backend/entities/ExpertApp'
import { Review } from '@backend/entities/Review'
import { User } from '@backend/entities/User'
import { ExpertApplicationListItemDTO, ExpertInfoResponseDTO } from '@backend/expert/expert.dto'
import { IUserReference } from '@backend/types'
import { parseReviewStatFromAggreationResult } from '@backend/utils/review'

import { IExpertApplicationQueryDTO } from '@libs/api'

@Injectable()
export class ExpertAppService {
  constructor(
    @InjectRepository(ExpertApp) private readonly expertAppRepo: EntityRepository<ExpertApp>,
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async applicationRequest(userRef: IUserReference) {
    const user = await userRef.getUser()
    const application = new ExpertApp()
    application.user = user as User
    try {
      await this.expertAppRepo.persistAndFlush(application)
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new UnprocessableEntityException('You already send the application.')
      } else {
        throw e
      }
    }
  }
  async getExpertApplicationListByKeyword({
    keyword = '%',
  }: IExpertApplicationQueryDTO): Promise<ExpertApplicationListItemDTO[]> {
    const allApplication = await this.expertAppRepo.find(
      {
        user: {
          $or: [
            { username: { $ilike: `%${keyword}%` } },
            { displayName: { $ilike: `%${keyword}%` } },
          ],
        },
      },
      {
        populate: ['user'],
      },
    )
    const outputList: ExpertApplicationListItemDTO[] = allApplication.map((value, index) => {
      const output: ExpertApplicationListItemDTO = {
        displayName: value.user.displayName,
        username: value.user.username,
        imageURL: value.user.profilePictureURL,
      }
      return output
    })
    return outputList
  }

  async computeExpertReviewStat(expert: User) {
    try {
      const query = this.entityManager
        .createQueryBuilder(Review, 'r')
        .select(['r.rating', 'count(*)'])
        .where({ session: { owner: expert } })
        .groupBy('r.rating')

      return parseReviewStatFromAggreationResult(await query.execute())
    } catch (error) {
      // in case no review
      return parseReviewStatFromAggreationResult([])
    }
  }

  async getExpertInfo(expertId: string): Promise<null | ExpertInfoResponseDTO> {
    //TODO Populate This
    const expert = await this.userRepo.findOne({ username: expertId })
    if (!expert) return null
    return {
      reviewStat: await this.computeExpertReviewStat(expert),
    }
  }
}
