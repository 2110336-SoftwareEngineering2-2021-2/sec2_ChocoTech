import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

import { FriendRequest } from '@backend/entities/FriendRequest'
import { Friendship } from '@backend/entities/Friendship'
import { User } from '@backend/entities/User'

import { FriendController } from './friend.controller'
import { FriendService } from './friend.service'

@Module({
  imports: [MikroOrmModule.forFeature([User, FriendRequest, Friendship])],
  providers: [FriendService],
  controllers: [FriendController],
  exports: [FriendService],
})
export class FriendModule {}
