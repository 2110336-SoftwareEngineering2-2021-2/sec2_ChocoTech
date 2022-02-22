import { ApiProperty } from '@nestjs/swagger'

import { User } from '../entities/User'

export class LoginResponseDTO {
  @ApiProperty()
  token: string

  @ApiProperty()
  user: Omit<User, 'passwordHash'>
}

export class MeResponseDTO {
  @ApiProperty()
  username: string

  @ApiProperty()
  displayName: string

  @ApiProperty()
  coinBalance: number

  @ApiProperty()
  onlineStatus: boolean

  @ApiProperty()
  email: string

  @ApiProperty()
  registerationDate: Date

  @ApiProperty()
  firstName: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  location: string
}
