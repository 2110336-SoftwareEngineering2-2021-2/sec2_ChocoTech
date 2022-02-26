import { Schedule } from '@backend/entities/Schedule'
import { UserSchedule } from '@backend/entities/UserSchedule'
import { ScheduleController } from '@backend/schedule/schedule.controller'
import { ScheduleService } from '@backend/schedule/schedule.service'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

@Module({
  imports: [MikroOrmModule.forFeature([Schedule, UserSchedule])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
