import { User } from '@backend/entities/User'
import { UserRegistrationRequest } from '@backend/register/register.dto'
import { Body, Controller, Post } from '@nestjs/common'

import { RegisterService } from './register.service'

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}
  @Post()
  async create(@Body() dto: UserRegistrationRequest) {
    await this.registerService.register(dto)
    return
  }
}
