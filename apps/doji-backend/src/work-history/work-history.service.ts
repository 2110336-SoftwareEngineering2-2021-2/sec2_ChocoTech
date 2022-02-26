import { UserReference } from '@backend/auth/auth.service'
import { User } from '@backend/entities/User'
import { WorkHistoryRequest } from '@backend/work-history/work-history.dto'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class WorkHistoryService {
  constructor(@InjectRepository(User) private readonly userRepo: EntityRepository<User>) {}

  // async editWorkHistory(dto: WorkHistoryRequest, userRef: UserReference) {
  //   const user = await userRef.getUser()
  //   await this.userRepo.persistAndFlush(user)
  // }
}
