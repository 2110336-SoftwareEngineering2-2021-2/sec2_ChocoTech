export interface IAttachCardRequestDTO {
  cardToken: string
  isDefault: boolean
}

export interface IUserTransactionLineResponseDTO {
  id: string
  description: string
  timestamp: Date
  amount: number
}

export interface IDepositRequest {
  amount: number
  cardId: string
}

export interface IWithdrawalRequest {
  amount: number
  destinationAccount: string
}
