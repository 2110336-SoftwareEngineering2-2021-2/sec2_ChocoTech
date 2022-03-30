import { CurrentUser, UserAuthGuard } from '@backend/auth/user.guard'
import { ExpertApplicationListItemDTO } from '@backend/expert/expert.dto'
import { IUserReference } from '@backend/types'
import { IExpertApplicationQueryDTO } from '@libs/api'
import { Controller, Get, NotFoundException, Param, Post, Query, UseGuards } from '@nestjs/common'
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger'

import { ExpertInfoResponseDTO } from './expert.dto'
import { ExpertAppService } from './expert.service'

@Controller('expert')
export class ExpertAppController {
  constructor(private readonly expertAppService: ExpertAppService) {}

  @Post('application')
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  async applicationRequest(@CurrentUser() user: IUserReference) {
    await this.expertAppService.applicationRequest(user)
    return
  }
  // TODO: AdminGuard
  @Get('applications')
  @ApiOperation({ description: 'Get expert application by keyword' })
  @ApiQuery({ name: 'keyword', allowEmptyValue: true })
  async getApplicationList(
    @Query() query: IExpertApplicationQueryDTO,
  ): Promise<ExpertApplicationListItemDTO[]> {
    return await this.expertAppService.getExpertApplicationListByKeyword(query)
  }

  @Get('info/:id')
  @ApiOperation({ description: "Retrieve an expert's information" })
  @ApiOkResponse({ type: ExpertInfoResponseDTO })
  async getExpertInfo(@Param('id') expertId: string): Promise<ExpertInfoResponseDTO> {
    const info = await this.expertAppService.getExpertInfo(expertId)
    if (!info) throw new NotFoundException('No expert with such id')
    return info
  }
}
