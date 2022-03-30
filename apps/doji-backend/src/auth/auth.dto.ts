import {
  IMeResponseDTO,
  IReview,
  ISchedule,
  IUserChangePasswordRequestDTO,
  IUserLoginRequestDTO,
  IUserRegistrationRequestDTO,
  IUserResetPasswordRequest,
  IUserSendResetPasswordEmailRequest,
  UserRole,
} from '@libs/api'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class MeResponseDTO implements IMeResponseDTO {
  username: string
  email: string
  displayName: string
  coinBalance: number
  onlineStatus: boolean
  registerationDate: Date
  role: UserRole
  firstName?: string
  lastName?: string
  location?: string
  omiseCustomerToken?: string
  googleRefreshToken?: string
  googleEmail?: string
  profilePictureURL?: string
  schedules: ISchedule[]
  reviews: IReview[]
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

export class UserSendResetPasswordEmailRequest implements IUserSendResetPasswordEmailRequest {
  @ApiProperty()
  @IsEmail()
  email: string
}

export class UserResetPasswordRequest implements IUserResetPasswordRequest {
  @ApiProperty()
  @IsString()
  newPassword: string
}

export class UserLoginRequestDTO implements IUserLoginRequestDTO {
  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsString()
  password: string
}
