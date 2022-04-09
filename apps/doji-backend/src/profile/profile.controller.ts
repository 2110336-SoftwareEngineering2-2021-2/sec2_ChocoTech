import { Body, Controller, Put, UseGuards } from '@nestjs/common'
import { ApiCookieAuth } from '@nestjs/swagger'

import { CurrentUser, UserAuthGuard } from '@backend/auth/user.guard'
import { UserEditProfileRequest } from '@backend/profile/profile.dto'
import { IUserReference } from '@backend/types'

import { ProfileService } from './profile.service'

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Put('edit')
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  async editProfile(@Body() dto: UserEditProfileRequest, @CurrentUser() user: IUserReference) {
    await this.profileService.editProfile(dto, user)
    return
  }
}
