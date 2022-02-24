import { ApiProperty } from '@nestjs/swagger'

import { User } from '../entities/User'
import { UserRole } from '../types/userRole'

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
  role: UserRole

  @ApiProperty()
  firstName?: string

  @ApiProperty()
  lastName?: string

  @ApiProperty()
  location?: string

  @ApiProperty()
  omiseCustomerToken?: string
}
