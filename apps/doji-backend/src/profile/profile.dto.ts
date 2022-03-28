import { IUserEditProfileRequestDTO } from '@libs/api'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class UserEditProfileRequest implements IUserEditProfileRequestDTO {
  @ApiProperty()
  @IsString()
  displayName: string

  @ApiProperty()
  @IsEmail()
  email: string

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
