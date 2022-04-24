import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsOptional, IsString } from 'class-validator'

import {
  ICreateChatRoomRequestDTO,
  IGetAllChatRoomsResponseDTO,
  IGetChatRoomResponseDTO,
  IMessageDTO,
  IMinimalUser,
} from '@libs/api'

export class GetAllChatRoomsResponseDTO implements IGetAllChatRoomsResponseDTO {
  @ApiProperty()
  id: string

  @ApiProperty({ nullable: true })
  name?: string | null

  @ApiProperty()
  lastMessage?: null | IMessageDTO

  @ApiProperty()
  participants: IMinimalUser[]
}

export class GetChatRoomResponseDTO implements IGetChatRoomResponseDTO {
  @ApiProperty()
  id: string

  @ApiProperty({ nullable: true })
  name?: string | null

  @ApiProperty()
  messages: IMessageDTO[]

  @ApiProperty()
  participants: IMinimalUser[]
}

export class CreateChatRoomRequestDTO implements ICreateChatRoomRequestDTO {
  @IsArray()
  @ApiProperty()
  participants: string[]

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true, default: null })
  name?: string
}
