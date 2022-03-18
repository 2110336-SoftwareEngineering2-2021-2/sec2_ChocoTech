import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import { ExpertApplicationRequest } from '@backend/expert/expert.dto'
import { IUserReference } from '@libs/api'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

import { ExpertAppService } from './expert.service'

@Controller('expert')
export class ExpertAppController {
  constructor(private readonly expertAppService: ExpertAppService) {}

  @Post('application')
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  async applicationRequest(
    @Body() dto: ExpertApplicationRequest,
    @CurrentUser() user: IUserReference,
  ) {
    await this.expertAppService.applicationRequest(dto, user)
    return
  }
}
