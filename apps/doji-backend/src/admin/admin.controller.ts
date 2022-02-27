import { AdminCreationRequestDTO } from '@backend/admin/admin.dto'
import { AdminService } from '@backend/admin/admin.service'
import { UserAuthGuard } from '@backend/auth/user-auth.guard'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('newAdmin')
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  async create(@Body() dto: AdminCreationRequestDTO) {
    await this.adminService.adminCreation(dto)
  }
}
