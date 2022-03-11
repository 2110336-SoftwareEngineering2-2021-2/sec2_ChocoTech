import { UserReference } from '@backend/auth/auth.service'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import {
  GetServiceByNameAndExpertUsernameDTO,
  ScheduleSessionDTO,
  ServiceInformationDTO,
} from '@backend/session/session.dto'
import { Session } from '@backend/entities/Session'
import { DeleteSessionParticipantRequest } from '@backend/session/session.dto'
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
  @Get()
  @UseGuards(UserAuthGuard)
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get all Session information' })
  @ApiResponse({ status: 200 })
  async findAll(@CurrentUser() user: UserReference): Promise<Session[]> {
    return await this.SessionService.getAllSession(user)
  }

  @Delete('participant')
  @UseGuards(UserAuthGuard)
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Cancle session of current user by SessionId' })
  @ApiResponse({ status: 200, description: 'Session is cancled' })
  @ApiResponse({ status: 404, description: 'Session not found or you are not in the shcedule' })
  async deleteSession(
    @Body() body: DeleteSessionParticipantRequest,
    @CurrentUser() user: UserReference,
  ) {
    await this.SessionService.deleteSessionParticipant(body.SessionId, user)
    return 'OK'
  }
}
