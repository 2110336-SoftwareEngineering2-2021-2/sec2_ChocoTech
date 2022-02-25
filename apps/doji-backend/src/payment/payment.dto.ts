import { IAttachCardRequestDTO } from '@libs/api'
import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'

export class AttachCardRequestDTO implements IAttachCardRequestDTO {
  @ApiProperty()
  @IsString()
  cardToken: string

  @ApiProperty()
  @IsBoolean()
  isDefault: boolean
}
