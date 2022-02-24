import { ILoginResponseDTO, IMeResponseDTO, UserRole } from '@libs/api'
import { ApiProperty } from '@nestjs/swagger'

export class LoginResponseDTO implements ILoginResponseDTO {
  @ApiProperty()
  token: string

  @ApiProperty()
  user: IMeResponseDTO
}

export class MeResponseDTO implements IMeResponseDTO {
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
