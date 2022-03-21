import { WorkHistory } from '@backend/entities/WorkHistory'
import { WorkHistoryRequestDTO } from '@backend/work-history/work-history.dto'
import { IUserReference } from '@libs/api'
import { EntityRepository, NotFoundError } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class WorkHistoryService {
  constructor(
    @InjectRepository(WorkHistory) private readonly workHistoryRepo: EntityRepository<WorkHistory>,
  ) {}

  async getAllWorkHistory(userRef: IUserReference) {
    return await this.workHistoryRepo.find({
      expert: await userRef.getUser(),
    })
  }

  async addWorkHistory(dto: WorkHistoryRequestDTO, userRef: IUserReference) {
    const workHistory = new WorkHistory()
    workHistory.expert = await userRef.getUser()
    workHistory.topic = dto.topic
    workHistory.description = dto.description
    await this.workHistoryRepo.persistAndFlush(workHistory)
  }

  async editWorkHistory(dto: WorkHistoryRequestDTO, userRef: IUserReference, workId: string) {
    let workHistory: WorkHistory
    try {
      workHistory = await this.workHistoryRepo.findOneOrFail({
        id: workId,
      })
      if (workHistory.expert !== (await userRef.getUser())) {
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

  async deleteWorkHistory(userRef: IUserReference, workId: string) {
    let workHistory: WorkHistory
    try {
      workHistory = await this.workHistoryRepo.findOneOrFail({
        id: workId,
      })
      if (workHistory.expert !== (await userRef.getUser())) {
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
