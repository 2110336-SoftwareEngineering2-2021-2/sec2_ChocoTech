import { CurrentUser, UserAuthGuard } from '@backend/auth/user.guard'
import { IUserReference } from '@backend/types'
import { WorkHistoryRequestDTO } from '@backend/work-history/work-history.dto'
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'

import { WorkHistoryService } from './work-history.service'

@Controller('expert/work/histories')
export class WorkHistoryController {
  constructor(private readonly workHistoryService: WorkHistoryService) {}

  @Get()
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ description: 'Get all my work history' })
  @ApiResponse({ status: 200, description: 'Given all my work history' })
  async getAllWorkHistory(@CurrentUser() user: IUserReference) {
    return await this.workHistoryService.getAllWorkHistory(user)
  }

  @Post()
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ description: 'Create my work history' })
  @ApiResponse({ status: 201, description: 'Create successful' })
  async addWorkHistory(@Body() dto: WorkHistoryRequestDTO, @CurrentUser() user: IUserReference) {
    await this.workHistoryService.addWorkHistory(dto, user)
    return
  }

  @Put(':workId')
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ description: 'Edit my work history' })
  @ApiResponse({ status: 200, description: 'Edit successful' })
  @ApiResponse({ status: 403, description: 'This is not your work history' })
  @ApiResponse({ status: 404, description: 'Work history ID is not founded' })
  async editWorkHistory(
    @Body() dto: WorkHistoryRequestDTO,
    @CurrentUser() user: IUserReference,
    @Param('workId') workId: string,
  ) {
    await this.workHistoryService.editWorkHistory(dto, user, workId)
    return
  }

  @Delete(':workId')
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ description: 'Delete my work history' })
  @ApiResponse({ status: 200, description: 'Delete successful' })
  @ApiResponse({ status: 403, description: 'This is not your work history' })
  @ApiResponse({ status: 404, description: 'Work history ID is not founded' })
  async deleteWorkHistory(@CurrentUser() user: IUserReference, @Param('workId') workId: string) {
    await this.workHistoryService.deleteWorkHistory(user, workId)
    return
  }
}
