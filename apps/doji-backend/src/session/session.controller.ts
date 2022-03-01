import { UserReference } from '@backend/auth/auth.service'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import {
  GetServiceByNameAndExpertUsernameDTO,
  ScheduleSessionDTO,
  ServiceInformationDTO,
} from '@backend/session/session.dto'
import { SessionService } from '@backend/session/session.service'
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}
  @Post('schedule')
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  async schedule(
    @Body() dto: ScheduleSessionDTO,
    @CurrentUser() user: UserReference,
  ): Promise<void> {
    await this.sessionService.schedule(dto, user)
  }
  @Get('service/:expert_username/:service_name')
  async getService(
    @Param('expert_username') expertUsername: string,
    @Param('service_name') serviceName: string,
  ): Promise<ServiceInformationDTO> {
    const dto = new GetServiceByNameAndExpertUsernameDTO()
    dto.expertUsername = expertUsername
    dto.serviceName = serviceName
    return await this.sessionService.getServiceByNameAndExpertUsername(dto)
  }
}
