import { UserReference } from '@backend/auth/auth.service'
import { WorkHistory } from '@backend/entities/WorkHistory'
import { WorkHistoryRequest } from '@backend/work-history/work-history.dto'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class WorkHistoryService {
  constructor(
    @InjectRepository(WorkHistory) private readonly workHistoryRepo: EntityRepository<WorkHistory>,
  ) {}

  async getWorkHistory(dto: WorkHistoryRequest, userRef: UserReference) {
    let workHistoryList = await this.workHistoryRepo.findAll({})
    const workHistory = new WorkHistory()
    await this.workHistoryRepo.persistAndFlush(workHistory)
  }

  async addWorkHistory(dto: WorkHistoryRequest, userRef: UserReference) {
    const workHistory = new WorkHistory()
    workHistory.expertUserName = userRef.username
    workHistory.topic = dto.topic
    workHistory.description = dto.description
    await this.workHistoryRepo.persistAndFlush(workHistory)
  }

  async editWorkHistory(dto: WorkHistoryRequest, userRef: UserReference) {
    const workHistory = new WorkHistory()
    workHistory.expertUserName = userRef.username
    workHistory.topic = dto.topic
    workHistory.description = dto.description
    await this.workHistoryRepo.persistAndFlush(workHistory)
  }

  // async deleteWorkHistory(dto: WorkHistoryRequest, userRef: UserReference) {
  //   this.workHistoryRepo.findOne()
  //   await this.workHistoryRepo.removeAndFlush(workHistory)
  // }
}
