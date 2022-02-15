import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { UserReference } from 'src/auth/auth.service'
import { CurrentUser, UserAuthGuard } from 'src/auth/user-auth.guard'
import { User } from 'src/entities/User'
import { UserChangePassword, UserRegistrationRequest } from 'src/register/register.dto'

import { RegisterService } from './register.service'

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}
  @Post()
  async create(@Body() dto: UserRegistrationRequest) {
    await this.registerService.register(dto)
    return
  }
  @Post('change-password')
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  async changePassword(@Body() dto: UserChangePassword, @CurrentUser() user: UserReference) {
    await this.registerService.changePassword(dto, user)
    return
  }
}
