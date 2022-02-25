import { Schedule, User_Schedule } from '@libs/api'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

import { ScheduleController } from './schedule.controller'
import { ScheduleService } from './schedule.service'

@Module({
  imports: [MikroOrmModule.forFeature([Schedule, User_Schedule])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
