import { UserReference } from '@backend/auth/auth.service'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import { UserEditProfileRequest } from '@backend/profile/profile.dto'
import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

import { ProfileService } from './profile.service'

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  async getMyProfile(@CurrentUser() user: UserReference) {
    return await this.profileService.getMyProfile(user)
  }

  @Put('edit')
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  async editProfile(@Body() dto: UserEditProfileRequest, @CurrentUser() user: UserReference) {
    await this.profileService.editProfile(dto, user)
    return
  }
}
