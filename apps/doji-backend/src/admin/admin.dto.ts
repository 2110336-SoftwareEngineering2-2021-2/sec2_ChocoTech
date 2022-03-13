import { IAdminCreationRequestDTO } from '@libs/api'
import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class AdminCreationRequestDTO implements IAdminCreationRequestDTO {
  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsString()
  password: string
}
