import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiCookieAuth } from '@nestjs/swagger'

import { CurrentUser, UserAuthGuard } from '@backend/auth/user.guard'
import { User } from '@backend/entities/User'
import { ReportDTO } from '@backend/report/report.dto'
import { ReportService } from '@backend/report/report.service'

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Post()
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  async report(@Body() dto: ReportDTO, @CurrentUser() user) {
    return await this.reportService.report(dto, user)
  }
}
