import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { randomUUID } from 'crypto'

import { CoinTransaction } from './CoinTransaction'
import { User } from './User'

export enum Account {
  /**
   * Platform's debt owe by the user
   */
  USER_PAYABLE_ACCOUNT = 'user_payable_account',
}

@Entity()
export class CoinTransactionLine {
  @PrimaryKey()
  id: string

  @ManyToOne(() => CoinTransaction)
  transaction: CoinTransaction

  @ManyToOne({ nullable: true })
  accountUser?: User

  @Enum(() => Account)
  @Property()
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
