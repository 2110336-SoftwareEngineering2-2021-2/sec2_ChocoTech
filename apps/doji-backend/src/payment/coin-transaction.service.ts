import { CoinTransaction } from '@backend/entities/CoinTransaction'
import { Account, CoinTransactionLine } from '@backend/entities/CoinTransactionLine'
import { User } from '@backend/entities/User'
import { UserTransactionLineResponse } from '@backend/payment/payment.dto'
import { EntityRepository, QueryOrder, Repository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'

export class CoinTransactionError extends Error {}

@Injectable()
export class CoinTransactionService {
  constructor(
    @InjectRepository(CoinTransaction)
    private readonly coinTransactionRepo: EntityRepository<CoinTransaction>,
    @InjectRepository(CoinTransactionLine)
    private readonly coinTransactionLineRepo: EntityRepository<CoinTransactionLine>,
  ) {}

  async depositUserAccount(user: User, amount: number, chargeId: string): Promise<CoinTransaction> {
    const t = new CoinTransaction()
    t.description = 'USER DEPOSIT VIA OMISE'

    const debitOmiseCashAcc = new CoinTransactionLine(t, Account.CHARGED_OMISE_CASH_ACCOUNT)
    debitOmiseCashAcc.amount = amount
    debitOmiseCashAcc.additionalData = JSON.stringify({ chargeId })

    const creditUserPayable = new CoinTransactionLine(t, Account.USER_PAYABLE_ACCOUNT)
    creditUserPayable.amount = amount
    creditUserPayable.accountUser = user

    user.coinBalance += amount

    t.lines.add(debitOmiseCashAcc)
    t.lines.add(creditUserPayable)

    await this.coinTransactionRepo.persistAndFlush(t)
    return t
  }

  async withdrawUserAccount(
    user: User,
    amount: number,
    destinationAccount: string,
  ): Promise<CoinTransaction> {
    const t = new CoinTransaction()
    t.description = 'USER WITHDRAW CASH'

    const creditOmiseCashAcc = new CoinTransactionLine(t, Account.CHARGED_OMISE_CASH_ACCOUNT)
    creditOmiseCashAcc.amount = -amount
    creditOmiseCashAcc.additionalData = JSON.stringify({ destinationAccount })

    const debitUserPayable = new CoinTransactionLine(t, Account.USER_PAYABLE_ACCOUNT)
    debitUserPayable.amount = -amount
    debitUserPayable.accountUser = user

    user.coinBalance -= amount
    if (user.coinBalance < 0) throw new CoinTransactionError('Insufficient Fund')

    await this.coinTransactionRepo.persistAndFlush(t)
    return t
  }

  async getUserTransactions(user: User): Promise<UserTransactionLineResponse[]> {
    const ts = await this.coinTransactionLineRepo.find(
      { accountUser: user, account: Account.USER_PAYABLE_ACCOUNT },
      { orderBy: { timestamp: QueryOrder.DESC }, populate: ['transaction'] },
    )
    return ts.map((t) => {
      const r = new UserTransactionLineResponse()
      r.id = t.id
      r.amount = t.amount
      r.description = t.transaction.description
      r.timestamp = t.timestamp
      return r
    })
  }
}
