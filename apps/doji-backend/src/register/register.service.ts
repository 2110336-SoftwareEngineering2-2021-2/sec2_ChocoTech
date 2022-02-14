import { EntityRepository, UniqueConstraintViolationException } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { colors } from '@mui/material'
import { HttpException, HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common'
import bcrypt from 'bcrypt'
import { UserReference } from 'src/auth/auth.service'
import { User } from 'src/entities/User'
import { UserChangePassword, UserRegistrationRequest } from 'src/register/register.dto'

@Injectable()
export class RegisterService {
  constructor(@InjectRepository(User) private readonly userRepo: EntityRepository<User>) {}
  async register(dto: UserRegistrationRequest) {
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
  async changePassword(dto: UserChangePassword, userRef: UserReference) {
    const user = await userRef.getUser()
    if (user.passwordHash == (await bcrypt.hash(dto.currentPassword, 10))) {
      user.passwordHash = await bcrypt.hash(dto.newPassword, 10)
    }
    await this.userRepo.persistAndFlush(user)
  }
}
