import { ExpertApp } from '@backend/entities/ExpertApp'
import { Review } from '@backend/entities/Review'
import { User } from '@backend/entities/User'
import {
  ExpertApplicationListItemDTO,
  ExpertApplicationRequest,
  ExpertInfoResponseDTO,
} from '@backend/expert/expert.dto'
import { parseReviewStatFromAggreationResult } from '@backend/utils/review'
import {
  IExpertApplicationListItemDTO,
  IExpertApplicationQueryDTO,
  IExpertInfoResponseDTO,
  IUserReference,
} from '@libs/api'
import { EntityRepository, UniqueConstraintViolationException } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager } from '@mikro-orm/postgresql'
import { Injectable, UnprocessableEntityException } from '@nestjs/common'

@Injectable()
export class ExpertAppService {
  constructor(
    @InjectRepository(ExpertApp) private readonly expertAppRepo: EntityRepository<ExpertApp>,
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async applicationRequest(dto: ExpertApplicationRequest, userRef: IUserReference) {
    const user = await userRef.getUser<User>()
    const application = new ExpertApp()
    application.user = user
    application.field = dto.field
    application.desc = dto.desc
    console.log(application)
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
            { firstName: { $ilike: `%${keyword}%` } },
            { lastName: { $ilike: `%${keyword}%` } },
          ],
        },
      },
      {
        populate: ['user'],
      },
    )
    const outputList: ExpertApplicationListItemDTO[] = allApplication.map((value, index) => {
      const output: ExpertApplicationListItemDTO = {
        firstname: value.user.firstName,
        lastname: value.user.lastName,
        username: value.user.username,
      }
      return output
    })
    return outputList
  }

  async computeExpertReviewStat(expert: User) {
    const query = this.entityManager
      .createQueryBuilder(Review, 'r')
      .select(['r.rating', 'count(*)'])
      .where({ session: { creator: expert } })
      .groupBy('r.rating')

    return parseReviewStatFromAggreationResult(await query.execute())
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
