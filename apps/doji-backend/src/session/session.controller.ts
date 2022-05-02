import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'

import { CurrentUser, ExpertAuthGuard, UserAuthGuard } from '@backend/auth/user.guard'
import {
  ChangeScheduleStatusRequestDTO,
  CreateSessionRequestDTO,
  ScheduleSessionDTO,
  ScheudleResponseDTO,
} from '@backend/session/session.dto'
import { SessionService } from '@backend/session/session.service'
import { IUserReference } from '@backend/types'

import { IScheduleResponseDTO, ISession, ISessionStatResponseDTO } from '@libs/api'

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  @HttpCode(200)
  @ApiCookieAuth()
  @ApiOperation({ description: 'Get all sessions' })
  @ApiResponse({ status: 200, description: 'Get all sessions' })
  async findAll(): Promise<ISession[]> {
    return await this.sessionService.getAllSessions()
  }

  @Get(':sessionId')
  @UseGuards(UserAuthGuard)
  async getSession(@Param('sessionId') sessionId: string): Promise<ISessionStatResponseDTO> {
    const session = await this.sessionService.getSession(sessionId)
    return {
      ...session,
    }
  }

  @Get('/expert/:username')
  @UseGuards(UserAuthGuard)
  async getSessionsByExpert(@Param('username') username: string): Promise<ISession[]> {
    return await this.sessionService.getSessionsByExpert(username)
  }

  @Post()
  @UseGuards(ExpertAuthGuard)
  @ApiCookieAuth()
  async create(
    @Body() dto: CreateSessionRequestDTO,
    @CurrentUser() userRef: IUserReference,
  ): Promise<ISession> {
    const user = await userRef.getUser()
    return await this.sessionService.create(dto, user)
  }

  @Get('/schedule/me')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ description: 'Get all schedules of current user' })
  @ApiCookieAuth()
  async getMySchedule(@CurrentUser() userRef: IUserReference): Promise<IScheduleResponseDTO[]> {
    const user = await userRef.getUser()
    const schedules = await this.sessionService.getMySchedules(user)
    return schedules
  }

  @Get('/schedule/request')
  @UseGuards(ExpertAuthGuard)
  @ApiOperation({ description: 'Get all requested schedule of expert user' })
  @ApiCookieAuth()
  async getRequestedSchedule(
    @CurrentUser() userRef: IUserReference,
  ): Promise<ScheudleResponseDTO[]> {
    const user = await userRef.getUser()
    return await this.sessionService.getRequestedSchedule(user)
  }

  @Post('schedule/request')
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  async schedule(
    @Body() dto: ScheduleSessionDTO,
    @CurrentUser() userRef: IUserReference,
  ): Promise<IScheduleResponseDTO> {
    const user = await userRef.getUser()
    return await this.sessionService.schedule(dto, user)
  }

  @Patch('schedule/:scheduleId')
  @UseGuards(ExpertAuthGuard)
  @ApiCookieAuth()
  async changeScheduleStatus(
    @Param('scheduleId') scheduleId: string,
    @Body() { status }: ChangeScheduleStatusRequestDTO,
  ): Promise<IScheduleResponseDTO> {
    return await this.sessionService.changeScheduleStatus(scheduleId, status)
  }

  @Delete('/schedule/:scheduleId/')
  @UseGuards(UserAuthGuard)
  @HttpCode(200)
  @ApiCookieAuth()
  @ApiOperation({ description: 'Cancel schedule of owner user by SecheduleId' })
  @ApiResponse({ status: 200, description: 'Schedule is cancled' })
  @ApiResponse({ status: 404, description: 'Schedule not found or you are not in the schedule' })
  async deleteSession(
    @Param('scheduleId') scheduleId: string,
    @CurrentUser() userRef: IUserReference,
  ) {
    const user = await userRef.getUser()
    await this.sessionService.deleteSchedule(scheduleId, user)
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
