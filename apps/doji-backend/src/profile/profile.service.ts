import { UserReference } from '@backend/auth/auth.service'
import { User } from '@backend/entities/User'
import { UserEditProfileRequest } from '@backend/profile/profile.dto'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(User) private readonly userRepo: EntityRepository<User>) {}

  async getMyProfile(userRef: UserReference) {
    return await this.userRepo.findOneOrFail({
      username: userRef.username,
    })
  }

  async editProfile(dto: UserEditProfileRequest, userRef: UserReference) {
    const user = await userRef.getUser()
    user.email = dto.email
    user.displayName = dto.displayName
    user.firstName = dto.firstName
    user.lastName = dto.lastName
    user.location = dto.location
    await this.userRepo.persistAndFlush(user)
  }
}
