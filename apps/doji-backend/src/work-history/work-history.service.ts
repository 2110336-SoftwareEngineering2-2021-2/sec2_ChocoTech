import { UserReference } from '@backend/auth/auth.service'
import { WorkHistory } from '@backend/entities/WorkHistory'
import {
  DeleteWorkHistoryRequest,
  EditWorkHistoryRequest,
  WorkHistoryRequest,
} from '@backend/work-history/work-history.dto'
import { EntityRepository, NotFoundError } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class WorkHistoryService {
  constructor(
    @InjectRepository(WorkHistory) private readonly workHistoryRepo: EntityRepository<WorkHistory>,
  ) {}

  async getAllWorkHistory(userRef: UserReference) {
    return await this.workHistoryRepo.find({
      expertUserName: userRef.username,
    })
  }

  async addWorkHistory(dto: WorkHistoryRequest, userRef: UserReference) {
    const workHistory = new WorkHistory()
    workHistory.expertUserName = userRef.username
    workHistory.topic = dto.topic
    workHistory.description = dto.description
    await this.workHistoryRepo.persistAndFlush(workHistory)
  }

  async editWorkHistory(dto: EditWorkHistoryRequest, userRef: UserReference) {
    let workHistory: WorkHistory
    try {
      workHistory = await this.workHistoryRepo.findOneOrFail({
        id: dto.id,
      })
      if (workHistory.expertUserName !== userRef.username) {
        throw new ForbiddenException('This is not your work history')
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException('Work history ID is not founded')
      } else {
        throw error
      }
    }
    workHistory.topic = dto.topic
    workHistory.description = dto.description
    await this.workHistoryRepo.persistAndFlush(workHistory)
  }

  async deleteWorkHistory(dto: DeleteWorkHistoryRequest, userRef: UserReference) {
    let workHistory: WorkHistory
    try {
      workHistory = await this.workHistoryRepo.findOneOrFail({
        id: dto.id,
      })
      if (workHistory.expertUserName !== userRef.username) {
        throw new ForbiddenException('This is not your work history')
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException('Work history ID is not founded')
      } else {
        throw error
      }
    }
    await this.workHistoryRepo.removeAndFlush(workHistory)
  }
}
