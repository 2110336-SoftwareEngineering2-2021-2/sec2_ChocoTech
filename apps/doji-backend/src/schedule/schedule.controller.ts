import { ScheduleReference, ScheduleService } from '@backend/schedule/schedule.service'
import { ScheduleMeResponseDTO } from '@libs/api'
import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('me')
  @ApiOperation({ description: 'Get current schedule information using username' })
  @ApiResponse({ status: 404, description: 'Id not found' })
  async getScheduleInformation(scheduleRef: ScheduleReference): Promise<ScheduleMeResponseDTO> {
    const schedule = await scheduleRef.getSchedule()
    return schedule
  }
}
