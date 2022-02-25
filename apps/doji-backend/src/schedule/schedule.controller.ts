import { UserReference } from '@backend/auth/auth.service'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import { ScheduleDeleteParticipantRequest, ScheduleReference } from '@backend/schedule/schedule.dto'
import { ScheduleService } from '@backend/schedule/schedule.service'
import { ScheduleMeResponseDTO } from '@libs/api'
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
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('id')
  @HttpCode(200)
  @ApiOperation({ description: 'Get current schedule information using username' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Schedule not found' })
  async getScheduleInformation(@Body() body: ScheduleReference): Promise<ScheduleMeResponseDTO> {
    const schedule = await this.scheduleService.scheduleFromId(body.scheduleId)
    if (!schedule) {
      throw new NotFoundException('Schedule not found')
    }
    return schedule
  }

  @Delete()
  @UseGuards(UserAuthGuard)
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Delete schedule using username and scheduleId' })
  @ApiResponse({ status: 200, description: 'Schedule is deleted' })
  @ApiResponse({ status: 404, description: 'Schedule not found or you are not in the shcedule' })
  async deleteSchedule(
    @Body() body: ScheduleDeleteParticipantRequest,
    @CurrentUser() user: UserReference,
  ) {
    await this.scheduleService.deleteScheduleParticipant(body.scheduleId, user)
    return 'OK'
  }
}
