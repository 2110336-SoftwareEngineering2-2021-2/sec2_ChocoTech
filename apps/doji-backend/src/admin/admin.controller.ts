import { AdminCreationRequestDTO } from '@backend/admin/admin.dto'
import { AdminService } from '@backend/admin/admin.service'
import { UserAuthGuard } from '@backend/auth/user.guard'
import { Admin } from '@backend/entities/Admin'
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ description: 'Get all admin' })
  @ApiResponse({ status: 403, description: 'There is no admin' })
  @ApiResponse({ status: 200, description: 'Given all admin' })
  async findAll(): Promise<Admin[]> {
    return await this.adminService.getAllAdmin()
  }

  @Post()
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ description: 'Regis new admin' })
  @ApiResponse({ status: 422, description: 'Admin with this username already exist.' })
  @ApiResponse({ status: 201, description: 'New admin is registered' })
  async create(@Body() dto: AdminCreationRequestDTO) {
    await this.adminService.adminCreation(dto)
  }
}
