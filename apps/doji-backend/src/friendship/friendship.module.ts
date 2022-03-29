import { FriendRequest } from '@backend/entities/FriendRequest'
import { User } from '@backend/entities/User'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

import { FriendshipController } from './friendship.controller'
import { FriendshipService } from './friendship.service'

@Module({
  imports: [MikroOrmModule.forFeature([User, FriendRequest])],
  controllers: [FriendshipController],
  providers: [FriendshipService],
  exports: [FriendshipService],
})
export class FriendshipModule {}
