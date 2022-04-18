import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'

import { CurrentUser, UserAuthGuard } from '@backend/auth/user.guard'
import {
  CreateChatRoomRequestDTO,
  GetAllChatRoomsResponseDTO,
  GetChatRoomResponseDTO,
} from '@backend/chat/chat.dto'
import { ChatService } from '@backend/chat/chat.service'
import { IUserReference } from '@backend/types'

@UseGuards(UserAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  @ApiOperation({ description: 'Get all chat room related with current user' })
  @ApiResponse({ status: 200, description: 'Get all chat room successfully' })
  @ApiCookieAuth()
  getAllChatRooms(@CurrentUser() userRef: IUserReference): Promise<GetAllChatRoomsResponseDTO[]> {
    return this.chatService.getAllChatrooms(userRef.username)
  }

  @Get(':roomId')
  @ApiOperation({ description: 'Get current user information' })
  @ApiResponse({ status: 401, description: 'The token is invalid' })
  @ApiResponse({ status: 200, description: 'The value associated with the given token' })
  @ApiCookieAuth()
  getChatRoom(@Param('roomId') roomId: string): Promise<GetChatRoomResponseDTO> {
    return this.chatService.getChatroom(roomId)
  }

  @Post()
  @ApiOperation({ description: 'Create a new chat room with given participants' })
  @ApiResponse({ status: 401, description: 'The token is invalid' })
  @ApiResponse({ status: 200, description: 'Create room successfully' })
  @ApiCookieAuth()
  createChatRoom(@CurrentUser() userRef: IUserReference, @Body() dto: CreateChatRoomRequestDTO) {
    return this.chatService.createChatroom(userRef.username, dto)
  }

  @Post('image')
  @ApiOperation({ description: 'Upload image when drop the image to the chat' })
  @ApiResponse({ status: 401, description: 'The token is invalid' })
  @ApiResponse({ status: 200, description: 'Upload successfully' })
  @ApiCookieAuth()
  uploadImage(@CurrentUser() userRef: IUserReference) {
    // TODO: Upload image
    // return this.chatService.uploadImage()
  }

  @Delete('image')
  @ApiOperation({ description: 'Delete uploaded image' })
  @ApiResponse({ status: 401, description: 'The token is invalid' })
  @ApiResponse({ status: 200, description: 'Delete successfully' })
  @ApiCookieAuth()
  deleteImage(@CurrentUser() userRef: IUserReference) {
    // TODO: Delete image
    // return this.chatService.deleteImage()
  }
}
