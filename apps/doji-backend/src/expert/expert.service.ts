import { UserReference } from '@backend/auth/auth.service'
import { ExpertApp } from '@backend/entities/ExpertApp'
import { ExpertApplicationRequest } from '@backend/expert/expert.dto'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ExpertAppService {
  constructor(
    @InjectRepository(ExpertApp) private readonly expertAppRepo: EntityRepository<ExpertApp>,
  ) {}

  async applicationRequest(dto: ExpertApplicationRequest, userRef: UserReference) {
    const user = await userRef.getUser()
    const application = new ExpertApp()
    application.username = user.username
    application.field = dto.field
    application.desc = dto.desc
    await this.expertAppRepo.persistAndFlush(application)
  }
}
