import { ExpertRequest } from '@backend/entities/ExpertRequest'
import { User } from '@backend/entities/User'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

import { ExpertRequestController } from './expert-request.controller'
import { ExpertRequestService } from './expert-request.service'

@Module({
  imports: [MikroOrmModule.forFeature([ExpertRequest, User])],
  controllers: [ExpertRequestController],
  providers: [ExpertRequestService],
  exports: [ExpertRequestService],
})
export class ExpertRequestModule {}
