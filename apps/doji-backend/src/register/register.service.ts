import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import bcrypt from 'bcrypt'
import { User } from 'src/entities/User'
import { UserRegistrationRequest } from 'src/register/register.dto'

@Injectable()
export class RegisterService {
  constructor(@InjectRepository(User) private readonly userRepo: EntityRepository<User>) {}
  async register(dto: UserRegistrationRequest) {
    //check for uniqueness of username and email
    if (await this.isUniqueAccount(dto)) {
      //create new user and hash password
      const newUser = new User()
      newUser.username = dto.username
      newUser.email = dto.email
      newUser.displayName = dto.displayName
      newUser.passwordHash = await bcrypt.hash(dto.password, 10)
      await this.create(newUser)//add to database
    }
    return
  }
  //create user service
  async create(user: User): Promise<User> {
    const createUser = await this.userRepo.create(user)
    await this.userRepo.persistAndFlush(createUser)
    return createUser
  }
  //check for user service
  async isUniqueAccount(
    dto: UserRegistrationRequest,
  ): Promise<boolean> {
    const response = await this.userRepo.findOne({
      $or: [{ username: dto.username }, { email: dto.email }],
    })

    //user not found
    if (!response) return true

    if (dto.username === response.username) {
      throw new HttpException('this username is already used', HttpStatus.BAD_REQUEST)
    } else if (dto.email === response.email) {
      throw new HttpException('this email is already used', HttpStatus.BAD_REQUEST)
    }

    return true
  }
}
