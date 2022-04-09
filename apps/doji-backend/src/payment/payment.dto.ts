import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsPositive, IsString } from 'class-validator'

import {
  IAttachCardRequestDTO,
  IDepositRequest,
  IUserTransactionLineResponseDTO,
  IWithdrawalRequest,
} from '@libs/api'

export class AttachCardRequestDTO implements IAttachCardRequestDTO {
  @ApiProperty()
  @IsString()
  cardToken: string

  @ApiProperty()
  @IsBoolean()
  isDefault: boolean
}

export class UserTransactionLineResponseDTO implements IUserTransactionLineResponseDTO {
  @ApiProperty()
  id: string

  @ApiProperty()
  description: string

  @ApiProperty()
  timestamp: Date

  @ApiProperty()
  amount: number
}

export class DepositRequest implements IDepositRequest {
  @ApiProperty()
  @IsPositive()
  amount: number

  @ApiProperty()
  @IsString()
  cardId: string
}

export class WithdrawalRequest implements IWithdrawalRequest {
  @ApiProperty()
  @IsPositive()
  amount: number

  @ApiProperty()
  @IsString()
  destinationAccount: string
}
