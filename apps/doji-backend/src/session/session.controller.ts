import { CurrentUser, UserAuthGuard } from '@backend/auth/user.guard'
import {
  DeleteSessionParticipantRequest,
  GetServiceByNameAndExpertUsernameDTO,
  ScheduleSessionDTO,
  ServiceInformationDTO,
  SessionInformationResponseDTO,
} from '@backend/session/session.dto'
import { SessionService } from '@backend/session/session.service'
import { ISession, ISessionInformationResponseDTO, IUserReference } from '@libs/api'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}
  @Post('schedule')
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  async schedule(
    @Body() dto: ScheduleSessionDTO,
    @CurrentUser() user: IUserReference,
  ): Promise<void> {
    await this.sessionService.schedule(dto, await user.getUser())
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
  @ApiCookieAuth()
  @ApiOperation({ description: 'Get all session of current user information' })
  @ApiResponse({ status: 200, description: 'All sessions of user have benn listed' })
  async findAll(@CurrentUser() user: IUserReference): Promise<ISession[]> {
    return await this.sessionService.getAllSession(user)
  }

  @Delete('participant')
  @UseGuards(UserAuthGuard)
  @HttpCode(200)
  @ApiCookieAuth()
  @ApiOperation({ description: 'Cancle session of current user by SessionId' })
  @ApiResponse({ status: 200, description: 'Session is cancled' })
  @ApiResponse({ status: 404, description: 'Session not found or you are not in the shcedule' })
  async deleteSession(
    @Body() body: DeleteSessionParticipantRequest,
    @CurrentUser() user: IUserReference,
  ) {
    await this.sessionService.deleteSessionParticipant(body.sessionId, user)
    return 'OK'
  }

  @Get('/session/:id')
  @ApiOperation({ description: 'Retrieve session info' })
  @ApiOkResponse({ type: SessionInformationResponseDTO })
  async getSession(@Param('id', ParseIntPipe) id: number): Promise<SessionInformationResponseDTO> {
    const session = await this.sessionService.getSessionInfo(id)
    if (!session) {
      throw new NotFoundException('No such session id')
    }
    //TODO Populate Value
    return {
      id: session.id,
      reviews: session.reviews.getItems().map((review) => ({
        id: review.id,
        rating: review.rating,
        content: review.content,
        authorName: `${review.user.firstName} ${review.user.lastName}`,
        createdAt: review.createdAt,
      })),
      reviewStat: await this.sessionService.calculateReviewStatForSession(session),
    }
  }
}
