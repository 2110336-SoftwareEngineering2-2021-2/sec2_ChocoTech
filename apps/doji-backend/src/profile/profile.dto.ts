import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

import { IUserEditProfileRequestDTO } from '@libs/api'

export class UserEditProfileRequest implements IUserEditProfileRequestDTO {
  @ApiProperty()
  @IsString()
  displayName: string

  @ApiProperty()
  @IsString()
  firstName: string

  @ApiProperty()
  @IsString()
  lastName: string

  @ApiProperty()
  @IsString()
  location: string
}
