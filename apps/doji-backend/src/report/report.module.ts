import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

import { Report } from '@backend/entities/Report'
import { User } from '@backend/entities/User'

import { ReportController } from './report.controller'
import { ReportService } from './report.service'

@Module({
  imports: [MikroOrmModule.forFeature([Report, User])],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
