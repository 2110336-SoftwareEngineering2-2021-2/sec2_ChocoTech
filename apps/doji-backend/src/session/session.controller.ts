import { UserReference } from '@backend/auth/auth.service'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import { Session } from '@backend/entities/Session'
import { DeleteSessionParticipantRequest } from '@backend/session/session.dto'
import { SessionService } from '@backend/session/session.service'
import { Body, Controller, Delete, Get, HttpCode, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('session')
export class SessionController {
  constructor(private readonly SessionService: SessionService) {}

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
