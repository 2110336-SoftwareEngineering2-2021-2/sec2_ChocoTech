import { EntityRepository, QueryOrder } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'

import { CoinTransaction } from '@backend/entities/CoinTransaction'
import { Account, CoinTransactionLine } from '@backend/entities/CoinTransactionLine'
import { User } from '@backend/entities/User'
import { UserTransactionLineResponseDTO } from '@backend/payment/payment.dto'

export class CoinTransactionError extends Error {}

export class InsufficientFundError extends Error {}

export class SimpleTransactionBuilder {
  private transaction: CoinTransaction
  private users: User[]

  constructor(private readonly coinTransactionRepo: EntityRepository<CoinTransaction>) {
    this.transaction = new CoinTransaction()
    this.users = []
  }

  setDescription(description: string): SimpleTransactionBuilder {
    this.transaction.description = description
    return this
  }

  incrementUserCoin(
    user: User,
    coin: number,
    additionalData?: Record<string, string>,
  ): SimpleTransactionBuilder {
    const line = new CoinTransactionLine(this.transaction, Account.USER_PAYABLE_ACCOUNT)
    line.accountUser = user

    if (additionalData) line.additionalData = JSON.stringify(additionalData)

    line.amount = coin
    this.transaction.lines.add(line)

    user.coinBalance += coin

    this.users.push(user)

    return this
  }

  async commit(): Promise<CoinTransaction> {
    if (this.users.filter((u) => u.coinBalance < 0).length > 0) throw new InsufficientFundError()

    await this.coinTransactionRepo.persistAndFlush(this.transaction)
    return this.transaction
  }
}

@Injectable()
export class CoinTransactionService {
  constructor(
    @InjectRepository(CoinTransaction)
    private readonly coinTransactionRepo: EntityRepository<CoinTransaction>,
    @InjectRepository(CoinTransactionLine)
    private readonly coinTransactionLineRepo: EntityRepository<CoinTransactionLine>,
  ) {}

  buildTransaction(): SimpleTransactionBuilder {
    return new SimpleTransactionBuilder(this.coinTransactionRepo)
  }

  async depositUserAccount(user: User, amount: number, chargeId: string): Promise<CoinTransaction> {
    return await this.buildTransaction()
      .setDescription('USER DEPOSIT VIA OMISE')
      .incrementUserCoin(user, amount, { chargeId })
      .commit()
  }

  async withdrawUserAccount(
    user: User,
    amount: number,
    destinationAccount: string,
  ): Promise<CoinTransaction> {
    return await this.buildTransaction()
      .setDescription('USER WITHDRAW CASH')
      .incrementUserCoin(user, -amount, { destinationAccount })
      .commit()
  }
  async payForService(user: User, amount: number): Promise<CoinTransaction> {
    return await this.buildTransaction()
      .setDescription('PAY FOR SCHEDULE SESSION')
      .incrementUserCoin(user, -(amount * 100))
      .commit()
  }
  async getUserTransactions(user: User): Promise<UserTransactionLineResponseDTO[]> {
    const transactions = await this.coinTransactionLineRepo.find(
      { accountUser: user, account: Account.USER_PAYABLE_ACCOUNT },
      { orderBy: { timestamp: QueryOrder.DESC }, populate: ['transaction'] },
    )
    return transactions.map((t) => {
      const item = new UserTransactionLineResponseDTO()
      item.id = t.id
      item.amount = t.amount
      item.description = t.transaction.description
      item.timestamp = t.timestamp
      return item
    })
  }
}
