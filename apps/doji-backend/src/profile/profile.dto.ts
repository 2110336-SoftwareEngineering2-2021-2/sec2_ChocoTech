import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

import { IUserEditProfileRequestDTO } from '@libs/api'

export class UserEditProfileRequestDTO implements IUserEditProfileRequestDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  displayName?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  firstName?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  location?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  profilePictureURL?: string
}
