import { Body, Controller, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { UserReference } from 'src/auth/auth.service'
import { CurrentUser, UserAuthGuard } from 'src/auth/user-auth.guard'
import { UserEditProfileRequest } from 'src/profile/profile.dto'

import { ProfileService } from './profile.service'

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Put('edit')
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  async editProfile(@Body() dto: UserEditProfileRequest, @CurrentUser() user: UserReference) {
    await this.profileService.editProfile(dto, user)
    return
  }
}
