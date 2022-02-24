import { UserReference } from '@backend/auth/auth.service'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import { UserRegistrationRequest } from '@backend/register/register.dto'
import { UserChangePasswordRequestDTO } from '@libs/api'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

import { RegisterService } from './register.service'

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}
  @Post()
  async create(@Body() dto: UserRegistrationRequest) {
    await this.registerService.register(dto)
  }

  @Post('change_password')
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  async changePassword(
    @Body() dto: UserChangePasswordRequestDTO,
    @CurrentUser() user: UserReference,
  ) {
    await this.registerService.changePassword(dto, user)
  }
}
