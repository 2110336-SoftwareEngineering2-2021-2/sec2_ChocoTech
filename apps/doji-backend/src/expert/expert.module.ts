import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

import { ExpertApp } from '@backend/entities/ExpertApp'
import { User } from '@backend/entities/User'

import { ExpertAppController } from './expert.controller'
import { ExpertAppService } from './expert.service'

@Module({
  imports: [MikroOrmModule.forFeature([ExpertApp, User])],
  controllers: [ExpertAppController],
  providers: [ExpertAppService],
  exports: [ExpertAppService],
})
export class ExpertAppModule {}
