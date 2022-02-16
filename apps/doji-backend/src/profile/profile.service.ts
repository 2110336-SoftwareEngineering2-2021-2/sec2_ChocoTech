import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { UserReference } from 'src/auth/auth.service'
import { User } from 'src/entities/User'
import { UserEditProfileRequest } from 'src/profile/profile.dto'

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(User) private readonly userRepo: EntityRepository<User>) {}

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
