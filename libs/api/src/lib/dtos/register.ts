import { ApiProperty } from '@nestjs/swagger'

export interface IUserChangePasswordRequestDTO {
  currentPassword: string
  newPassword: string
}

export class IUserRegistrationRequestDTO {
  username: string
  displayName: string
  email: string
  password: string
}
