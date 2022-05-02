import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common'
import { ApiCookieAuth } from '@nestjs/swagger'

import { CurrentUser, UserAuthGuard } from '@backend/auth/user.guard'
import { ProfileResponseDTO, UserEditProfileRequest } from '@backend/profile/profile.dto'
import { IUserReference } from '@backend/types'

import { ProfileService } from './profile.service'

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':username')
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  async getProfile(@Param('username') username: string): Promise<ProfileResponseDTO> {
    return await this.profileService.getProfile(username)
  }

  @Put('edit')
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  async editProfile(@Body() dto: UserEditProfileRequest, @CurrentUser() user: IUserReference) {
    await this.profileService.editProfile(dto, user)
    return
  }
}
