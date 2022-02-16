import { UserReference } from '@backend/auth/auth.service'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import { UserChangePassword, UserRegistrationRequest } from '@backend/register/register.dto'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

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
