import { RequestStatus } from '@backend/entities/ExpertRequest'
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common'

import { ExpertRequestDto, updatRequestStatus } from './expert-request.dto'
import { ExpertRequestService } from './expert-request.service'

@Controller('expert-request')
export class ExpertRequestController {
  constructor(private readonly expertRequestService: ExpertRequestService) {}
  @Get('request-id/:id')
  findById(@Param('id', new ParseIntPipe()) id: number) {
    return this.expertRequestService.findRequestById(id)
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
  @Patch('update-status/:id')
  updateStatus(@Param('id', new ParseIntPipe()) id: number, @Body() status: updatRequestStatus) {
    const statusEnum = status.requestStatus as RequestStatus
    if (Object.values(RequestStatus).includes(statusEnum)) {
      return this.expertRequestService.updateStatus(id, statusEnum)
    } else {
      throw new HttpException('The status is not valid.', HttpStatus.BAD_REQUEST)
    }
  }
  @Post('new-request')
  newRequest(@Body() dto: ExpertRequestDto) {
    return this.expertRequestService.newRequest(dto)
  }
}
