import { ApiProperty } from '@nestjs/swagger'

export interface IUserChangePasswordRequestDTO {
  currentPassword: string
  newPassword: string
}

export class UserCreationRequestDTO {
  @ApiProperty()
  username: string

  @ApiProperty()
  displayName: string

  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}
