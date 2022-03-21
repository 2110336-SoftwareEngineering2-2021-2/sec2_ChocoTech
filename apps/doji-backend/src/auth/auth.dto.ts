import { Session } from '@backend/entities/Session'
import {
  IMeResponseDTO,
  IUserChangePasswordRequestDTO,
  IUserRegistrationRequestDTO,
  UserRole,
} from '@libs/api'
import { Collection } from '@mikro-orm/core'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNumber, IsString } from 'class-validator'

export class MeResponseDTO implements IMeResponseDTO {
  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  displayName: string

  @ApiProperty()
  @IsNumber()
  coinBalance: number

  @ApiProperty()
  onlineStatus: boolean

  @ApiProperty()
  registerationDate: Date

  @ApiProperty({ enum: Object.values(UserRole), default: UserRole.USER })
  role: UserRole

  @ApiProperty()
  firstName?: string

  @ApiProperty()
  lastName?: string

  @ApiProperty()
  location?: string

  @ApiProperty()
  omiseCustomerToken?: string

  @ApiProperty()
  sessions: Collection<Session>

  @ApiProperty()
  googleRefreshToken?: string

  @ApiProperty()
  googleEmail?: string
}

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
