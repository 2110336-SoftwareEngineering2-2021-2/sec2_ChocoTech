import { IFriendRequestResponseDTO } from '@libs/api'
import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString, isString } from 'class-validator'

export class FriendRequestResponseDTO implements IFriendRequestResponseDTO {
  @ApiProperty()
  @IsString()
  id: string

  @ApiProperty()
  @IsBoolean()
  accept: boolean
}

export class FriendDTO {
  @ApiProperty()
  @IsString()
  username: string
}
