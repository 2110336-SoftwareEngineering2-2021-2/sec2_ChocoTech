import { ExpertExperienceRequest } from '@backend/admin/admin.dto'
import { AdminService } from '@backend/admin/admin.service'
import { UserReference } from '@backend/auth/auth.service'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import { Admin } from '@backend/entities/Admin'
import { ExpertApp } from '@backend/entities/ExpertApp'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('schedule')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('expertExp')
  @HttpCode(200)
  @ApiOperation({ description: 'Get expert experience using username' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Expert experience not found' })
  async getExpertExperience(@Body() body: ExpertExperienceRequest): Promise<ExpertApp> {
    const experience = await this.adminService.expertExpFromusername(body.username)
    if (!experience) {
      throw new NotFoundException('Expert experience not found')
    }
    return experience
  }
}
