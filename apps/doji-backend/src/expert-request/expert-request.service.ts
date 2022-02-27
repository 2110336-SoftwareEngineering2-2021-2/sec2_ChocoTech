import { ExpertRequest, RequestStatus } from '@backend/entities/ExpertRequest'
import { User } from '@backend/entities/User'
import {
  EntityRepository,
  NotFoundError,
  QueryOrder,
  UniqueConstraintViolationException,
} from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common'

import { ExpertRequestDto } from './expert-request.dto'

export class ReturnedRequestInfo {
  applicationContent: string
  userFirstname: string
  userLastname: string
}

@Injectable()
export class ExpertRequestService {
  constructor(
    @InjectRepository(ExpertRequest)
    private readonly expertRequestRepo: EntityRepository<ExpertRequest>,
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
  ) {}
  async findRequestByStatus(requestStatus: RequestStatus): Promise<ExpertRequest[]> {
    return await this.expertRequestRepo.find(
      { status: requestStatus },
      { requestDate: QueryOrder.DESC },
    )
  }
  async updateStatus(requestId: number, status: RequestStatus) {
    let request: ExpertRequest
    try {
      request = await this.expertRequestRepo.findOneOrFail({ id: requestId })
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new NotFoundException('Expert request not found.')
      } else {
        throw e
      }
    }
    request.status = status
    return await this.expertRequestRepo.persistAndFlush(request)
  }
  async findRequestById(requestId: number) {
    let request: ExpertRequest
    try {
      request = await this.expertRequestRepo.findOneOrFail({ id: requestId })
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new NotFoundException('Expert request not found.')
      } else {
        throw e
      }
    }
    const userReference = await this.userRepo.findOneOrFail({
      username: request.expertUser.username,
    })
    const requestInfo = new ReturnedRequestInfo()
    requestInfo.applicationContent = request.applicationContent
    requestInfo.userFirstname = userReference.firstName
    requestInfo.userLastname = userReference.lastName
    return requestInfo
  }
  async newRequest(dto: ExpertRequestDto) {
    let userReference: User
    try {
      userReference = await this.userRepo.findOneOrFail({ username: dto.expertUserUsername })
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new NotFoundException('User not found.')
      } else {
        throw e
      }
    }
    const newExpertRequest = new ExpertRequest()
    newExpertRequest.applicationContent = dto.applicationContent
    newExpertRequest.expertUser = userReference
    try {
      return await this.expertRequestRepo.persistAndFlush(newExpertRequest)
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new UnprocessableEntityException('This user has already requested.')
      } else {
        throw e
      }
    }
  }
}
