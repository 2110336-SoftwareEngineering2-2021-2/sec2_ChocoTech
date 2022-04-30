import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common'

import { CurrentUser, UserAuthGuard } from '@backend/auth/user.guard'
import { FriendService } from '@backend/friend/friend.service'
import { IUserReference } from '@backend/types'

@UseGuards(UserAuthGuard)
@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get('all')
  async getAllFriends(@CurrentUser() userRef: IUserReference) {
    return await this.friendService.getAllFriends(userRef)
  }

  @Get(':username')
  async getRelationship(
    @CurrentUser() userRef: IUserReference,
    @Param('username') username: string,
  ) {
    return 'this will return relationship status [None, SenderPending, ReceiverPending, Friend]'
  }

  //@Post(':username')
}
