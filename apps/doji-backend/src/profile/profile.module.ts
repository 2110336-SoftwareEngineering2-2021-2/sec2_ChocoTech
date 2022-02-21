import { User } from '@libs/api'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

import { ProfileController } from './profile.controller'
import { ProfileService } from './profile.service'

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
