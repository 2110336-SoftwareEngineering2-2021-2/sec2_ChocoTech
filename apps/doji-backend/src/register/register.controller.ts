import { Body, Controller, Post } from '@nestjs/common'
import { User } from 'src/entities/User'
import { UserRegistrationRequest } from 'src/register/register.dto'

import { RegisterService } from './register.service'

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}
  @Post()
  async create(
    @Body() dto: UserRegistrationRequest,
  ) {
    await this.registerService.register(dto)
    return
  }
}
