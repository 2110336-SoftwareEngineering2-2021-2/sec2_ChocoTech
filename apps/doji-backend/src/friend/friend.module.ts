import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

import { User } from '@backend/entities/User'

import { FriendController } from './friend.controller'
import { FriendService } from './friend.service'

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [FriendService],
  controllers: [FriendController],
  exports: [FriendService],
})
export class FriendModule {}
