import { UserReference } from '@backend/auth/auth.service'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import { EditWorkHistoryRequest } from '@backend/work-history/work-history.dto'
import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

import { WorkHistoryService } from './work-history.service'

@Controller('work-history')
export class WorkHistoryController {
  constructor(private readonly workHistoryService: WorkHistoryService) {}

  @Get()
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Post()
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Delete()
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Put()
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  async editWorkHistory(@Body() dto: EditWorkHistoryRequest, @CurrentUser() user: UserReference) {
    await this.workHistoryService.editWorkHistory(dto, user)
    return
  }
}
