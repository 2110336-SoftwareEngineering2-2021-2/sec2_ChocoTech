import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'

import { CurrentUser, UserAuthGuard } from '@backend/auth/user.guard'
import {
  CreateChatRoomRequestDTO,
  GetAllChatRoomsResponseDTO,
  GetChatRoomResponseDTO,
} from '@backend/chat/chat.dto'
import { ChatService } from '@backend/chat/chat.service'
import { ImageService } from '@backend/image/image.service'
import { IUserReference } from '@backend/types'

@UseGuards(UserAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly imageService: ImageService,
  ) {}

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
  getChatRoom(
    @CurrentUser() userRef: IUserReference,
    @Param('roomId') roomId: string,
  ): Promise<GetChatRoomResponseDTO> {
    return this.chatService.getChatroom(roomId, userRef.username)
  }

  @Post()
  @ApiOperation({ description: 'Create a new chat room with given participants' })
  @ApiResponse({ status: 401, description: 'The token is invalid' })
  @ApiResponse({ status: 201, description: 'Create room successfully' })
  @ApiCookieAuth()
  createChatRoom(@CurrentUser() userRef: IUserReference, @Body() dto: CreateChatRoomRequestDTO) {
    return this.chatService.createChatroom(userRef.username, dto)
  }

  @Post('image')
  @ApiOperation({ description: 'Upload image when drop the image to the chat' })
  @ApiResponse({ status: 401, description: 'The token is invalid' })
  @ApiResponse({ status: 200, description: 'Upload successfully' })
  @ApiCookieAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', { dest: 'imgs' }))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.imageService.uploadFile(file)
  }
}
