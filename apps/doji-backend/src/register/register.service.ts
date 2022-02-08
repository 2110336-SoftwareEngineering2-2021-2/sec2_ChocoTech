import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import bcrypt from 'bcrypt'
import { User } from 'src/entities/User'

@Injectable()
export class RegisterService {
  constructor(@InjectRepository(User) private readonly userRepo: EntityRepository<User>) {}
  async register(dto: Omit<User, 'id' | 'coinBalance' | 'onlineStatus' | 'registerationDate'>) {
    if (
      dto.username === undefined ||
      dto.email === undefined ||
      dto.displayName === undefined ||
      dto.passwordHash === undefined
    ) {
      //check for validation of input data
      throw new HttpException('Incorrect data', HttpStatus.BAD_REQUEST)
    }
    //check for uniqueness of username and email
    const checkUser = await this.check(dto.username, dto.email)
    if (checkUser != undefined) {
      if (dto.username === checkUser.username && dto.email == checkUser.email) {
        throw new HttpException('this username and email is already used', HttpStatus.BAD_REQUEST)
      } else if (dto.username === checkUser.username) {
        throw new HttpException('this username is already used', HttpStatus.BAD_REQUEST)
      } else if (dto.email === checkUser.email) {
        throw new HttpException('this email is already used', HttpStatus.BAD_REQUEST)
      } else {
        throw new HttpException('unknown error occur', HttpStatus.BAD_REQUEST)
      }
    }
    //create new user and hash password
    const newUser = new User()
    newUser.username = dto.username
    newUser.email = dto.email
    newUser.displayName = dto.displayName
    newUser.passwordHash = await bcrypt.hash(dto.passwordHash, 10)
    await this.create(newUser)
    //add to database
    throw new HttpException('Successfully register', HttpStatus.CREATED)
    return
  }
  // create user service
  async create(user: User): Promise<User> {
    const creatUser = await this.userRepo.create(user)
    await this.userRepo.persistAndFlush(creatUser)
    return creatUser
  }
  //check for user service
  async check(usn: string, em: string): Promise<User> {
    const response = await this.userRepo.findOne({ $or: [{ username: usn }, { email: em }] })
    return response
  }
}
