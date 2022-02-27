import { UserReference } from '@backend/auth/auth.service'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import { ExpertApp } from '@backend/entities/ExpertApp'
import { ExpertApplicationRequest, ExpertExperienceRequest } from '@backend/expert/expert.dto'
import { Body, Controller, Get, HttpCode, NotFoundException, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'

import { ExpertAppService } from './expert.service'

@Controller('expert')
export class ExpertAppController {
  constructor(private readonly expertAppService: ExpertAppService) {}

  @Post('application')
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  async applicationRequest(
    @Body() dto: ExpertApplicationRequest,
    @CurrentUser() user: UserReference,
  ) {
    await this.expertAppService.applicationRequest(dto, user)
    return
  }
}
