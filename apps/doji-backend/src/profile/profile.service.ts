import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'

import { User } from '@backend/entities/User'
import { UserEditProfileRequestDTO } from '@backend/profile/profile.dto'
import { IUserReference } from '@backend/types'

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(User) private readonly userRepo: EntityRepository<User>) {}

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
