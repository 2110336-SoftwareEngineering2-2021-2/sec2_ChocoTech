import { IUserChangePasswordRequestDTO, IUserRegistrationRequestDTO } from '@libs/api'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class UserRegistrationRequestDTO implements IUserRegistrationRequestDTO {
  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsString()
  password: string

  @ApiProperty()
  @IsString()
  displayName: string

  @ApiProperty()
  @IsEmail()
  email: string
}

export class UserChangePasswordRequestDTO implements IUserChangePasswordRequestDTO {
  @ApiProperty()
  @IsString()
  currentPassword: string

  @ApiProperty()
  @IsString()
  newPassword: string
}
