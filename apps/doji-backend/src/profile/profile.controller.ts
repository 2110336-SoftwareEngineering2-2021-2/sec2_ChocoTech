import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import { UserEditProfileRequest } from '@backend/profile/profile.dto'
import { IUserReference } from '@libs/api'
import { Body, Controller, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

import { ProfileService } from './profile.service'

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Put('edit')
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  async editProfile(@Body() dto: UserEditProfileRequest, @CurrentUser() user: IUserReference) {
    await this.profileService.editProfile(dto, user)
    return
  }
}
