import { ExpertApp } from '@backend/entities/ExpertApp'
import { User } from '@backend/entities/User'
import { ExpertApplicationRequest } from '@backend/expert/expert.dto'
import { IUserReference } from '@libs/api'
import { EntityRepository, UniqueConstraintViolationException } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable, UnprocessableEntityException } from '@nestjs/common'

@Injectable()
export class ExpertAppService {
  constructor(
    @InjectRepository(ExpertApp) private readonly expertAppRepo: EntityRepository<ExpertApp>,
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
}
