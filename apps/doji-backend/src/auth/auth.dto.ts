import { IMeResponseDTO, UserRole } from '@libs/api'
import { ApiProperty } from '@nestjs/swagger'

export class MeResponseDTO implements IMeResponseDTO {
  @ApiProperty()
  username: string

  @ApiProperty()
  email: string

  @ApiProperty()
  displayName: string

  @ApiProperty()
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
}
