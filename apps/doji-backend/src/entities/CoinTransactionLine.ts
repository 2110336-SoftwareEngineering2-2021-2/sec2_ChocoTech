import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { randomUUID } from 'crypto'

import { CoinTransaction } from './CoinTransaction'
import { User } from './User'

export enum Account {
  /**
   * Fund Charged from Omise
   */
  CHARGED_OMISE_CASH_ACCOUNT,

  /**
   * Platform's debt owe by the user
   */
  USER_PAYABLE_ACCOUNT,
}

@Entity()
export class CoinTransactionLine {
  @PrimaryKey()
  id: string

  @ManyToOne(() => CoinTransaction)
  transaction: CoinTransaction

  @ManyToOne({ nullable: true })
  accountUser?: User

  @Property({ nullable: true })
  account: Account

  @Property({ nullable: true })
  additionalData?: string

  @Property()
  amount: number

  @Property()
  timestamp: Date

  constructor(transaction: CoinTransaction, account: Account) {
    this.id = randomUUID()
    this.transaction = transaction
    this.account = account
    this.timestamp = new Date()
  }
}
