import { UserReference } from '@backend/auth/auth.service'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import { ScheduleSessionDTO } from '@backend/session/session.dto'
import { SessionService } from '@backend/session/session.service'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}
  @Post('schedule')
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  async schedule(@Body() dto: ScheduleSessionDTO, @CurrentUser() user: UserReference) {
    await this.sessionService.schedule(dto, user)
  }
}
