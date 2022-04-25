import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable, NotFoundException } from '@nestjs/common'

import { User } from '@backend/entities/User'
import { WorkHistory } from '@backend/entities/WorkHistory'
import { UserEditProfileRequest } from '@backend/profile/profile.dto'
import { IUserReference } from '@backend/types'

import { IWorkHistory } from '@libs/api'

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
    @InjectRepository(WorkHistory) private readonly workHistoryRepo: EntityRepository<WorkHistory>,
  ) {}

  async getProfile(username: string) {
    const user = await this.userRepo.findOne({ username: username })
    const workHistory = await this.workHistoryRepo.find({ expert: user })
    if (!user) {
      throw new NotFoundException('User not found or do not have work history')
    }

    const wh = workHistory.map((wh) => wrap(wh).toJSON() as IWorkHistory)

    return {
      username: user.username,
      displayName: user.displayName,
      role: user.role,
      profilePictureURL: user.profilePictureURL,
      workHistory: wh,
    }
  }

  async editProfile(dto: UserEditProfileRequest, userRef: IUserReference) {
    const user = await userRef.getUser()
    user.displayName = dto.displayName
    user.firstName = dto.firstName
    user.lastName = dto.lastName
    user.location = dto.location
    await this.userRepo.persistAndFlush(user)
  }
}
