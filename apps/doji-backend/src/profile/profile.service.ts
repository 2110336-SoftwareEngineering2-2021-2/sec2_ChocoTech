import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'

import { User } from '@backend/entities/User'
import { UserEditProfileRequest } from '@backend/profile/profile.dto'
import { IUserReference } from '@backend/types'

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(User) private readonly userRepo: EntityRepository<User>) {}

  async editProfile(dto: UserEditProfileRequest, userRef: IUserReference) {
    const user = await userRef.getUser()
    user.displayName = dto.displayName
    user.firstName = dto.firstName
    user.lastName = dto.lastName
    user.location = dto.location
    await this.userRepo.persistAndFlush(user)
  }
}
