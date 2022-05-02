import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'

import { IUsernameDTO, IfriendRequestRespondDTO } from '@libs/api'

export class FriendRequestRespondDTO implements IfriendRequestRespondDTO {
  @ApiProperty()
  @IsString()
  id: string

  @ApiProperty()
  @IsBoolean()
  accept: boolean
}

export class UsernameDTO implements IUsernameDTO {
  @ApiProperty()
  @IsString()
  username: string
}
