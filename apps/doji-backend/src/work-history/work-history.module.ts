import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

import { WorkHistory } from '@backend/entities/WorkHistory'
import { ImageModule } from '@backend/image/image.module'

import { WorkHistoryController } from './work-history.controller'
import { WorkHistoryService } from './work-history.service'

@Module({
  imports: [MikroOrmModule.forFeature([WorkHistory]), ImageModule],
  controllers: [WorkHistoryController],
  providers: [WorkHistoryService],
  exports: [WorkHistoryService],
})
export class WorkHistoryModule {}
