import { UserReference } from '@backend/auth/auth.service'
import { WorkHistory } from '@backend/entities/WorkHistory'
import { EditWorkHistoryRequest } from '@backend/work-history/work-history.dto'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class WorkHistoryService {
  constructor(
    @InjectRepository(WorkHistory) private readonly workHistoryRepo: EntityRepository<WorkHistory>,
  ) {}

  async editWorkHistory(dto: EditWorkHistoryRequest, userRef: UserReference) {
    const user = await userRef.getUser()
    await this.workHistoryRepo.persistAndFlush(user)
  }
}
