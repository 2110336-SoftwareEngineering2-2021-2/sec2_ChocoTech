import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

import { CoinTransaction } from '@backend/entities/CoinTransaction'
import { CoinTransactionLine } from '@backend/entities/CoinTransactionLine'
import { User } from '@backend/entities/User'
import { CoinTransactionService } from '@backend/payment/coin-transaction.service'

import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'

@Module({
  imports: [MikroOrmModule.forFeature([User, CoinTransaction, CoinTransactionLine])],
  providers: [PaymentService, CoinTransactionService],
  controllers: [PaymentController],
  exports: [PaymentService, CoinTransactionService],
})
export class PaymentModule {}
