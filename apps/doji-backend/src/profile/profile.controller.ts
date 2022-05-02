import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiCookieAuth } from '@nestjs/swagger'

import { CurrentUser, UserAuthGuard } from '@backend/auth/user.guard'
import { ImageService } from '@backend/image/image.service'
import { UserEditProfileRequestDTO } from '@backend/profile/profile.dto'
import { ProfileResponseDTO } from '@backend/profile/profile.dto'
import { IUserReference } from '@backend/types'

import { IUserEditProfileResponseDTO } from '@libs/api'

import { ProfileService } from './profile.service'

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly imageService: ImageService,
  ) {}

  @Get(':username')
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  async getProfile(@Param('username') username: string): Promise<ProfileResponseDTO> {
    return await this.profileService.getProfile(username)
  }

  @Patch('edit')
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', { dest: 'imgs' }))
  async editProfile(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UserEditProfileRequestDTO,
    @CurrentUser() user: IUserReference,
  ): Promise<IUserEditProfileResponseDTO> {
    let profilePictureURL: string
    if (file) {
      const { url } = await this.imageService.uploadFile(file)
      profilePictureURL = url
    }

    return await this.profileService.editProfile({ ...dto, profilePictureURL }, user)
  }
}
