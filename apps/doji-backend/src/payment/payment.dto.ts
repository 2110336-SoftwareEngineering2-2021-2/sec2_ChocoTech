import { IAttachCardRequestDTO } from '@libs/api'
import { ApiProperty } from '@nestjs/swagger'

export class AttachCardRequestDTO implements IAttachCardRequestDTO {
  @ApiProperty()
  cardToken: string

  @ApiProperty()
  isDefault: boolean
}
