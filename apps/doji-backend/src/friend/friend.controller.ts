import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { CurrentUser, UserAuthGuard } from '@backend/auth/user.guard'
import { FriendRequestRespondDTO, UsernameDTO } from '@backend/friend/friend.dto'
import { FriendService } from '@backend/friend/friend.service'
import { IUserReference } from '@backend/types'

import { IMinimalFriend, IfriendRequestDTO } from '@libs/api'

@UseGuards(UserAuthGuard)
@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get()
  @ApiOperation({ description: "Get current user's list of friends" })
  async getAllFriends(@CurrentUser() userRef: IUserReference): Promise<IMinimalFriend[]> {
    return (await this.friendService.getAllFriends(userRef)) as IMinimalFriend[]
  }

  @Get('notFriend')
  @ApiOperation({ description: "Get current user's list of not friends" })
  async getAllNotFriends(@CurrentUser() userRef: IUserReference): Promise<IMinimalFriend[]> {
    return (await this.friendService.getAllNotFriends(userRef)) as IMinimalFriend[]
  }

  @Get('requests')
  @ApiOperation({ description: "Get current user's pending friend request" })
  async getAllFriendRequest(@CurrentUser() userRef: IUserReference): Promise<IfriendRequestDTO[]> {
    return (await this.friendService.getAllRequestReceived(userRef)) as IfriendRequestDTO[]
  }

  @Get('rel/:username')
  async getRelationship(
    @CurrentUser() userRef: IUserReference,
    @Param('username') username: string,
  ) {
    return await this.friendService.getRelationship(userRef, username)
  }

  @Post('send')
  @ApiOperation({ description: 'send friend request' })
  sendRequest(@CurrentUser() userRef: IUserReference, @Body() dto: UsernameDTO) {
    return this.friendService.sendFriendRequest(userRef, dto.username)
  }

  @Post('respond')
  @ApiOperation({ description: 'respond friend request' })
  respondRequest(@CurrentUser() userRef: IUserReference, @Body() dto: FriendRequestRespondDTO) {
    this.friendService.respondFriendRequest(userRef, dto.id, dto.accept)
  }

  @Post('unfriend')
  @ApiOperation({ description: 'unfriend a friend' })
  unfriend(@CurrentUser() userRef: IUserReference, @Body() dto: UsernameDTO) {
    //this.friendService.unfriend(userRef, dto.username)
    this.friendService.testFunction()
  }
  @Post('friendship')
  @ApiOperation({ description: 'add friend to current user without acceptance' })
  addFriend(@CurrentUser() userRef: IUserReference, @Body() dto: UsernameDTO) {
    //this.friendService.unfriend(userRef, dto.username)
    return this.friendService.addFriendWithoutConfirmation(userRef, dto)
  }

  @Delete('cancel')
  @ApiOperation({ description: 'cancel friend request' })
  cancelRequest(@CurrentUser() userRef: IUserReference, @Body() dto: UsernameDTO) {
    this.friendService.cancelFriendRequest(userRef, dto.username)
  }
}
