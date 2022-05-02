import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable, NotFoundException } from '@nestjs/common'

import { User } from '@backend/entities/User'
import { WorkHistory } from '@backend/entities/WorkHistory'
import { ExpertAppService } from '@backend/expert/expert.service'
import { ProfileResponseDTO, UserEditProfileRequestDTO } from '@backend/profile/profile.dto'
import { SessionService } from '@backend/session/session.service'
import { IUserReference } from '@backend/types'

import { IWorkHistory } from '@libs/api'

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
    @InjectRepository(WorkHistory) private readonly workHistoryRepo: EntityRepository<WorkHistory>,
    private readonly expertAppService: ExpertAppService,
    private readonly sessionService: SessionService,
  ) {}

  async getProfile(username: string): Promise<ProfileResponseDTO> {
    const res = new ProfileResponseDTO()

    const user = await this.userRepo.findOne({ username: username })
    if (!user) {
      throw new NotFoundException('User not found or do not have work history')
    }
    res.username = user.username
    res.displayName = user.displayName
    res.profilePictureURL = user.profilePictureURL
    res.role = user.role

    const workHistory = await this.workHistoryRepo.find({ expert: user })
    res.workHistory = workHistory.map((wh) => wrap(wh).toJSON() as IWorkHistory)

    user.role === 'expert'
      ? (res.rating = await this.expertAppService.computeExpertReviewStat(user))
      : (res.rating = null)

    user.role === 'expert'
      ? (res.sessions = await this.sessionService.getSessionsByExpert(user.username))
      : (res.sessions = null)

    return res
  }

  async editProfile(dto: UserEditProfileRequestDTO, userRef: IUserReference) {
    const user = await userRef.getUser()

    user.displayName = dto.displayName || user.displayName
    user.firstName = dto.firstName || user.firstName
    user.lastName = dto.lastName || user.lastName
    user.location = dto.location || user.location
    user.profilePictureURL = dto.profilePictureURL || user.profilePictureURL
    await this.userRepo.persistAndFlush(user)
    return user
  }
}
