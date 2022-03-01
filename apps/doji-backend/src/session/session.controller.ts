import { UserReference } from '@backend/auth/auth.service'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import { Session } from '@backend/entities/Session'
import { SessionDeleteParticipantRequest } from '@backend/session/session.dto'
import { SessionService } from '@backend/session/session.service'
import { Body, Controller, Delete, Get, HttpCode, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('Session')
export class SessionController {
  constructor(private readonly SessionService: SessionService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ description: 'Get all Session information' })
  @ApiResponse({ status: 200 })
  async findAll(): Promise<Session[]> {
    return await this.SessionService.getAllSession()
  }

  @Delete('participant')
  @UseGuards(UserAuthGuard)
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Delete Session using username and SessionId' })
  @ApiResponse({ status: 200, description: 'Session is deleted' })
  @ApiResponse({ status: 404, description: 'Session not found or you are not in the shcedule' })
  async deleteSession(
    @Body() body: SessionDeleteParticipantRequest,
    @CurrentUser() user: UserReference,
  ) {
    await this.SessionService.deleteSessionParticipant(body.SessionId, user)
    return 'OK'
  }
}
