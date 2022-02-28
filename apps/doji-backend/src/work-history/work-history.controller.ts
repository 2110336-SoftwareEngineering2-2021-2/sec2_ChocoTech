import { UserReference } from '@backend/auth/auth.service'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import {
  DeleteWorkHistoryRequest,
  EditWorkHistoryRequest,
  WorkHistoryRequest,
} from '@backend/work-history/work-history.dto'
import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'

import { WorkHistoryService } from './work-history.service'

@Controller('expert/work/histories')
export class WorkHistoryController {
  constructor(private readonly workHistoryService: WorkHistoryService) {}

  @Get()
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get all my work history' })
  @ApiResponse({ status: 200, description: 'Given all my work history' })
  async getAllWorkHistory(@CurrentUser() user: UserReference) {
    return await this.workHistoryService.getAllWorkHistory(user)
  }

  @Post()
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Create my work history' })
  @ApiResponse({ status: 201, description: 'Create successful' })
  async addWorkHistory(@Body() dto: WorkHistoryRequest, @CurrentUser() user: UserReference) {
    await this.workHistoryService.addWorkHistory(dto, user)
    return
  }

  @Put()
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Edit my work history' })
  @ApiResponse({ status: 200, description: 'Edit successful' })
  @ApiResponse({ status: 403, description: 'This is not your work history' })
  @ApiResponse({ status: 404, description: 'Work history ID is not founded' })
  async editWorkHistory(@Body() dto: EditWorkHistoryRequest, @CurrentUser() user: UserReference) {
    await this.workHistoryService.editWorkHistory(dto, user)
    return
  }

  @Delete()
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Delete my work history' })
  @ApiResponse({ status: 200, description: 'Delete successful' })
  @ApiResponse({ status: 403, description: 'This is not your work history' })
  @ApiResponse({ status: 404, description: 'Work history ID is not founded' })
  async deleteWorkHistory(
    @Body() dto: DeleteWorkHistoryRequest,
    @CurrentUser() user: UserReference,
  ) {
    await this.workHistoryService.deleteWorkHistory(dto, user)
    return
  }
}
