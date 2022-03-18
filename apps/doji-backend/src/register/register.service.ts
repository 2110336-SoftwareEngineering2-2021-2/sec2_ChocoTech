import { User } from '@backend/entities/User'
import {
  UserChangePasswordRequestDTO,
  UserRegistrationRequestDTO,
} from '@backend/register/register.dto'
import { IUserReference } from '@libs/api'
import { EntityRepository, UniqueConstraintViolationException } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import bcrypt from 'bcrypt'

@Injectable()
export class RegisterService {
  constructor(@InjectRepository(User) private readonly userRepo: EntityRepository<User>) {}
  async register(dto: UserRegistrationRequestDTO) {
    //create new user and hash password
    const newUser = new User()
    newUser.username = dto.username
    newUser.email = dto.email
    newUser.displayName = dto.displayName
    newUser.passwordHash = await bcrypt.hash(dto.password, 10)
    try {
      await this.userRepo.persistAndFlush(newUser) //add to database
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new UnprocessableEntityException('User with this username or email already exist.')
      } else {
        throw e
      }
    }
    return
  }
  async changePassword(dto: UserChangePasswordRequestDTO, userRef: IUserReference) {
    const user = await userRef.getUser()
    if (await bcrypt.compare(dto.currentPassword, user.passwordHash)) {
      user.passwordHash = await bcrypt.hash(dto.newPassword, 10)
      await this.userRepo.persistAndFlush(user)
    } else {
      throw new UnprocessableEntityException('Your current password is not correct.')
    }
  }
}
