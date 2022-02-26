import {
  IAttachCardRequestDTO,
  IDepositRequest,
  IUserTransactionLineResponse,
  IWithdrawalRequest,
} from '@libs/api'
import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNumber, IsPositive, IsString } from 'class-validator'

export class AttachCardRequestDTO implements IAttachCardRequestDTO {
  @ApiProperty()
  @IsString()
  cardToken: string

  @ApiProperty()
  @IsBoolean()
  isDefault: boolean
}

export class UserTransactionLineResponse implements IUserTransactionLineResponse {
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
  card: string
}

export class WithdrawalRequest implements IWithdrawalRequest {
  @ApiProperty()
  @IsPositive()
  amount: number

  @ApiProperty()
  @IsString()
  destinationAccount: string
}
