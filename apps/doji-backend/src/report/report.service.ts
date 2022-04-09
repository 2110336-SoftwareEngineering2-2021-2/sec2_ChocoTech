import { UniqueConstraintViolationException } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

import { Report } from '@backend/entities/Report'
import { User } from '@backend/entities/User'
import { ReportDTO } from '@backend/report/report.dto'

import { UserRole } from '@libs/api'

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private readonly reportRepo: EntityRepository<Report>,
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
  ) {}

  async report(dto: ReportDTO, reporter: User) {
    const reportedExpert = await this.userRepo.findOne({ username: dto.expertUsername })
    if (!reportedExpert) {
      throw new HttpException('Expert not found', HttpStatus.BAD_REQUEST)
    }
    if (reportedExpert.role != UserRole.EXPERT) {
      throw new HttpException('The reported user must be an expert', HttpStatus.BAD_REQUEST)
    }
    const newReport = new Report()
    newReport.reporter = reporter
    newReport.expert = reportedExpert
    try {
      await this.reportRepo.persistAndFlush(newReport)
    } catch (exception) {
      if (exception instanceof UniqueConstraintViolationException) {
        throw new HttpException('You have reported this expert', HttpStatus.BAD_REQUEST)
      }
    }
  }
}
