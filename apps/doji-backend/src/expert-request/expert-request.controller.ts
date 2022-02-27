import { RequestStatus } from '@backend/entities/ExpertRequest'
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common'

import { ExpertRequestDto, updateRequestStatus } from './expert-request.dto'
import { ExpertRequestService } from './expert-request.service'

@Controller('expert-request')
export class ExpertRequestController {
  constructor(private readonly expertRequestService: ExpertRequestService) {}
  @Get('request-username/:username')
  findByUsername(@Param('username') username: string) {
    return this.expertRequestService.findRequestById(username)
  }
  @Get('request-status/:status')
  findByStatus(@Param('status') status: string) {
    const statusEnum = status as RequestStatus
    if (Object.values(RequestStatus).includes(statusEnum)) {
      return this.expertRequestService.findRequestByStatus(statusEnum)
    } else {
      throw new HttpException('The status is not valid.', HttpStatus.BAD_REQUEST)
    }
  }
  @Patch('update-status/:username')
  updateStatus(@Param('username') username: string, @Body() status: updateRequestStatus) {
    const statusEnum = status.requestStatus as RequestStatus
    if (Object.values(RequestStatus).includes(statusEnum)) {
      return this.expertRequestService.updateStatus(username, statusEnum)
    } else {
      throw new HttpException('The status is not valid.', HttpStatus.BAD_REQUEST)
    }
  }
  @Post('new-request')
  newRequest(@Body() dto: ExpertRequestDto) {
    return this.expertRequestService.newRequest(dto)
  }
}
