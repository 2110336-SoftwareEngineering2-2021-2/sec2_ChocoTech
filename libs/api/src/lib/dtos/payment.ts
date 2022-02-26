export interface IAttachCardRequestDTO {
  cardToken: string
  isDefault: boolean
}

export interface IUserTransactionLineResponse {
  id: string
  description: string
  timestamp: Date
  amount: number
}

export interface IDepositRequest {
  amount: number
  card: string
}

export interface IWithdrawalRequest {
  amount: number
  destinationAccount: string
}
