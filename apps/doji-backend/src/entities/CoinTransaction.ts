import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core'
import { randomUUID } from 'crypto'

import { CoinTransactionLine } from './CoinTransactionLine'

@Entity()
export class CoinTransaction {
  @PrimaryKey()
  id: string

  @OneToMany(() => CoinTransactionLine, (line) => line.transaction)
  lines = new Collection<CoinTransactionLine>(this)

  @Property()
  description: string

  constructor() {
    this.id = randomUUID()
  }
}
