import { AdminCreationRequestDTO } from '@backend/admin/admin.dto'
import { AdminService } from '@backend/admin/admin.service'
import { Admin } from '@backend/entities/Admin'
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // TODO: AdminGuard
  @Get()
  @ApiOperation({ description: 'Get all admin' })
  @ApiResponse({ status: 403, description: 'There is no admin' })
  @ApiResponse({ status: 200, description: 'Given all admin' })
  async findAll(): Promise<Admin[]> {
    return await this.adminService.getAllAdmin()
  }

  @Get('workHistory/:username')
  @ApiOperation({ description: 'Get all work histories by username' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 200, description: 'Given all users work histories' })
  async getUserWorkHistory(@Param('username') username: string) {
    return await this.adminService.getWorkHistoryByUsername(username)
  }

  @Put('approveExpert')
  @ApiOperation({ description: 'Edit role to approve user to be expert by username' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 200, description: 'Edited users role to expert' })
  async appoveExpert(@Param('username') username: string) {
    return await this.adminService.approveExpert(username)
  }

  @Post()
  @ApiOperation({ description: 'Regis new admin' })
  @ApiResponse({ status: 422, description: 'Admin with this username already exist.' })
  @ApiResponse({ status: 201, description: 'New admin is registered' })
  async create(@Body() dto: AdminCreationRequestDTO) {
    await this.adminService.adminCreation(dto)
  }
}
