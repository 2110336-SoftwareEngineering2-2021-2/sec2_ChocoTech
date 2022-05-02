import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Express } from 'express'
import { Multer } from 'multer'

import { CurrentUser, UserAuthGuard } from '@backend/auth/user.guard'
import { ImageService } from '@backend/image/image.service'
import { IUserReference } from '@backend/types'
import { WorkHistoryRequestDTO } from '@backend/work-history/work-history.dto'

import { WorkHistoryService } from './work-history.service'

@Controller('expert/work/histories')
export class WorkHistoryController {
  constructor(
    private readonly workHistoryService: WorkHistoryService,
    private readonly imageService: ImageService,
  ) {}

  @Get()
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ description: 'Get all my work history' })
  @ApiResponse({ status: 200, description: 'Given all my work history' })
  async getAllWorkHistory(@CurrentUser() userRef: IUserReference) {
    const user = await userRef.getUser()
    return await this.workHistoryService.getAllWorkHistory(user)
  }

  @Post()
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
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ description: 'Create my work history' })
  @ApiResponse({ status: 201, description: 'Create successful' })
  async addWorkHistory(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: WorkHistoryRequestDTO,
    @CurrentUser() userRef: IUserReference,
  ) {
    const user = await userRef.getUser()
    const { url } = await this.imageService.uploadFile(file)
    const { topic, description } = dto
    await this.workHistoryService.addWorkHistory(user, topic, description, url)
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
    @CurrentUser() userRef: IUserReference,
    @Param('workId') workId: string,
  ) {
    const user = await userRef.getUser()
    const { topic, description } = dto
    await this.workHistoryService.editWorkHistory(user, topic, description, workId)
    return
  }

  @Delete(':workId')
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ description: 'Delete my work history' })
  @ApiResponse({ status: 200, description: 'Delete successful' })
  @ApiResponse({ status: 403, description: 'This is not your work history' })
  @ApiResponse({ status: 404, description: 'Work history ID is not founded' })
  async deleteWorkHistory(@CurrentUser() userRef: IUserReference, @Param('workId') workId: string) {
    const user = await userRef.getUser()
    await this.workHistoryService.deleteWorkHistory(user, workId)
    return
  }
}
