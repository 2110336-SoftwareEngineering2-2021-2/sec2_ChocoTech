import { UserReference } from '@backend/auth/auth.service'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import { EditWorkHistoryRequest, WorkHistoryRequest } from '@backend/work-history/work-history.dto'
import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

import { WorkHistoryService } from './work-history.service'

@Controller('work-history')
export class WorkHistoryController {
  constructor(private readonly workHistoryService: WorkHistoryService) {}

  @Get()
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  async getAllWorkHistory(@CurrentUser() user: UserReference) {
    return await this.workHistoryService.getAllWorkHistory(user)
  }

  @Post()
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  async addWorkHistory(@Body() dto: WorkHistoryRequest, @CurrentUser() user: UserReference) {
    await this.workHistoryService.addWorkHistory(dto, user)
    return
  }

  @Put()
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  async editWorkHistory(@Body() dto: EditWorkHistoryRequest, @CurrentUser() user: UserReference) {
    await this.workHistoryService.editWorkHistory(dto, user)
    return
  }

  // @Delete()
  // @UseGuards(UserAuthGuard)
  // @ApiBearerAuth()
  // async deleteWorkHistory(@Body() dto: WorkHistoryRequest, @CurrentUser() user: UserReference) {
  //   await this.workHistoryService.deleteWorkHistory(dto, user)
  //   return
  // }
}
