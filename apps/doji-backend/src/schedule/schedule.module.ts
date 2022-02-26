import { ScheduleController } from '@backend/schedule/schedule.controller'
import { ScheduleService } from '@backend/schedule/schedule.service'
import { Schedule, User_Schedule } from '@libs/api'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

@Module({
  imports: [MikroOrmModule.forFeature([Schedule, User_Schedule])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
