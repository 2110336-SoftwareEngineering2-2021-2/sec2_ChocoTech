import { ExpertApp } from '@backend/entities/ExpertApp'
import { User } from '@backend/entities/User'
import { ExpertApplicationRequest } from '@backend/expert/expert.dto'
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
  async getExpertApplicationListByKeyword(query: IExpertApplicationQueryDTO) {
    let allApplication
    if (query.keyword) {
      allApplication = await this.expertAppRepo.find({
        user: {
          $or: [
            { firstName: { $ilike: `%${query.keyword}%` } },
            { lastName: { $ilike: `%${query.keyword}%` } },
          ],
        },
      })
    } else {
      allApplication = await this.expertAppRepo.findAll()
    }
    const outputList = await Promise.all(
      allApplication.map(async (val, index) => {
        const userData = await this.userRepo.findOne({ username: val.user.username })
        const output: IExpertApplicationListItemDTO = {
          firstname: userData.firstName,
          lastname: userData.lastName,
          username: val.user.username,
        }
        return output
      }),
    )
    return outputList
  }
}
