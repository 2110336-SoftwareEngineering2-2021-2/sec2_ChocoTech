import { CurrentUser, UserAuthGuard } from '@backend/auth/user.guard'
import { FriendDTO } from '@backend/friendship/friendship.dto'
import { FriendshipService } from '@backend/friendship/friendship.service'
import { IUserReference } from '@libs/api'
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Get()
  @UseGuards(UserAuthGuard)
  @ApiOperation({ description: 'get all refs to current user friends' })
  @ApiResponse({ status: 200 })
  @ApiCookieAuth()
  async getFriend(@CurrentUser() userRef: IUserReference) {
    return await this.friendshipService.getFriends(userRef)
  }

  @Get('my-requests')
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  async getFriendRequest(@CurrentUser() userRef: IUserReference) {
    return await this.friendshipService.getFriendRequests(userRef)
  }

  //get latest request involving the current user and one another
  //  -if have request from current user, show 'cancel request' button
  //  -if have request from another user, show 'response request' button
  //  -if none, show 'send friend request' button
  @Get('request')
  @ApiOperation({
    description:
      "get latest request involving the current user and one another\n\t-if have request from current user, show 'cancel request' button\n\t-if have request from another user, show 'response request' button\n\t-if none, show 'send friend request' button",
  })
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  async getFriendStatus(@CurrentUser() me: IUserReference, @Body() them: IUserReference) {
    let friendRequest = this.friendshipService.getRequestFrom(me, them)
    if (friendRequest) return { request: friendRequest, status: 'sent' }
    else {
      friendRequest = this.friendshipService.getRequestTo(me, them)
    }
    if (friendRequest) return { request: friendRequest, status: 'received' }
    else return { request: null, status: 'none' }
  }

  @Post('send-request')
  @UseGuards(UserAuthGuard)
  @ApiCookieAuth()
  async sendFriendRequest(senderRef: IUserReference, receiverRef: IUserReference) {
    this.friendshipService.sendFriendRequest(senderRef, receiverRef)
  }
}
