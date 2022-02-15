import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common'
import bcrypt from 'bcrypt'
import { User } from 'src/entities/User'

import { RegisterService } from './register.service'

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}
  @Post()
  async create(
    @Body() dto: Omit<User, 'id' | 'coinBalance' | 'onlineStatus' | 'registerationDate'>,
  ) {
    await this.registerService.register(dto)
    return
  }
}
