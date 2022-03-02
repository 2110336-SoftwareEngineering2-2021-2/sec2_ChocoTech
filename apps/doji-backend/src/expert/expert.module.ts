import { ExpertApp } from '@backend/entities/ExpertApp'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

import { ExpertAppController } from './expert.controller'
import { ExpertAppService } from './expert.service'

@Module({
  imports: [MikroOrmModule.forFeature([ExpertApp])],
  controllers: [ExpertAppController],
  providers: [ExpertAppService],
  exports: [ExpertAppService],
})
export class ExpertAppModule {}
