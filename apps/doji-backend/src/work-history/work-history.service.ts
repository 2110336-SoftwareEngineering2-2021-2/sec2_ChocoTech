import { EntityRepository, NotFoundError } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'

import { User } from '@backend/entities/User'
import { WorkHistory } from '@backend/entities/WorkHistory'

@Injectable()
export class WorkHistoryService {
  constructor(
    @InjectRepository(WorkHistory) private readonly workHistoryRepo: EntityRepository<WorkHistory>,
  ) {}

  async getAllWorkHistory(user: User) {
    return await this.workHistoryRepo.find({ expert: user })
  }

  async addWorkHistory(user: User, topic: string, description: string, imageURL: string) {
    const workHistory = new WorkHistory(user, topic, description, imageURL)
    await this.workHistoryRepo.persistAndFlush(workHistory)
  }

  async editWorkHistory(user: User, topic: string, description: string, workId: string) {
    let workHistory: WorkHistory
    try {
      workHistory = await this.workHistoryRepo.findOneOrFail({
        id: workId,
      })
      if (workHistory.expert !== user) {
        throw new ForbiddenException('This is not your work history')
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException('Work history ID is not founded')
      } else {
        throw error
      }
    }
    workHistory.topic = topic
    workHistory.description = description
    await this.workHistoryRepo.persistAndFlush(workHistory)
  }

  async deleteWorkHistory(user: User, workId: string) {
    let workHistory: WorkHistory
    try {
      workHistory = await this.workHistoryRepo.findOneOrFail({
        id: workId,
      })
      if (workHistory.expert !== user) {
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
