import { CurrentUser, ExpertAuthGuard, UserAuthGuard } from '@backend/auth/user.guard'
import { User } from '@backend/entities/User'
import { CreateSessionRequestDTO, ScheduleSessionDTO } from '@backend/session/session.dto'
import { SessionService } from '@backend/session/session.service'
import { ISchedule, ISession, ISessionResponseDTO, IUserReference } from '@libs/api'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  @HttpCode(200)
  @ApiCookieAuth()
  @ApiOperation({ description: 'Get all session of current user information' })
  @ApiResponse({ status: 200, description: 'All sessions of user have benn listed' })
  async findAll(@Query('expert_username') expertUsername?: string): Promise<ISession[]> {
    return await this.sessionService.getAllSessionsByExpert(expertUsername)
  }

  @Get(':sessionId')
  @UseGuards(UserAuthGuard)
  async getService(@Param('sessionId') sessionId: string): Promise<ISessionResponseDTO> {
    const session = await this.sessionService.getSession(sessionId)
    return {
      ...session,
      reviewStat: await this.sessionService.calculateReviewStatForSession(session),
    }
  }

  @Post()
  @UseGuards(ExpertAuthGuard)
  @ApiCookieAuth()
  async create(
    @Body() dto: CreateSessionRequestDTO,
    @CurrentUser() userRef: IUserReference,
  ): Promise<ISession> {
    const user = await userRef.getUser<User>()
    return await this.sessionService.create(dto, user)
  }

  @Post('schedule')
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  async schedule(
    @Body() dto: ScheduleSessionDTO,
    @CurrentUser() userRef: IUserReference,
  ): Promise<ISchedule> {
    const user = await userRef.getUser<User>()
    return await this.sessionService.schedule(dto, user)
  }

  @Post('accept/schedule/:scheduleId')
  @UseGuards(ExpertAuthGuard)
  @ApiCookieAuth()
  async acceptSchedule(@Param('scheduleId') scheduleId: string): Promise<ISchedule> {
    return await this.sessionService.acceptSchedule(scheduleId)
  }

  @Delete(':sessionId/participant')
  @UseGuards(UserAuthGuard)
  @HttpCode(200)
  @ApiCookieAuth()
  @ApiOperation({ description: 'Cancel session of current user by SessionId' })
  @ApiResponse({ status: 200, description: 'Session is cancled' })
  @ApiResponse({ status: 404, description: 'Session not found or you are not in the shcedule' })
  async deleteSession(
    @Param('sessionId') sessionId: string,
    @CurrentUser() userRef: IUserReference,
  ) {
    const user = await userRef.getUser<User>()
    await this.sessionService.removeParticipant(sessionId, user)
  }

  // @Get(':id')
  // @ApiOperation({ description: 'Retrieve session info' })
  // @ApiOkResponse({ type: SessionInformationResponseDTO })
  // async getSession(@Param('id') id: string): Promise<SessionInformationResponseDTO> {
  //   const session = await this.sessionService.getSessionInfo(id)
  //   if (!session) {
  //     throw new NotFoundException('No such session id')
  //   }
  //   // TODO Populate Value
  //   return {
  //     id: session.id,
  //     reviews: session.reviews.getItems().map((review) => ({
  //       id: review.id,
  //       rating: review.rating,
  //       content: review.content,
  //       authorName: `${review.user.firstName} ${review.user.lastName}`,
  //       createdAt: review.createdAt,
  //     })),
  //     reviewStat: await this.sessionService.calculateReviewStatForSession(session),
  //   }
  // }
}
