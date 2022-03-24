import { ExpertApp } from '@backend/entities/ExpertApp'
import { User } from '@backend/entities/User'
import { ExpertApplicationListItemDTO, ExpertApplicationRequest } from '@backend/expert/expert.dto'
import {
  IExpertApplicationListItemDTO,
  IExpertApplicationQueryDTO,
  IUserReference,
} from '@libs/api'
import { EntityRepository, UniqueConstraintViolationException } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable, UnprocessableEntityException } from '@nestjs/common'

@Injectable()
export class ExpertAppService {
  constructor(
    @InjectRepository(ExpertApp) private readonly expertAppRepo: EntityRepository<ExpertApp>,
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
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
}
