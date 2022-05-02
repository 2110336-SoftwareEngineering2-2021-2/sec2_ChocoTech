import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

import { CoinTransaction } from '@backend/entities/CoinTransaction'
import { CoinTransactionLine } from '@backend/entities/CoinTransactionLine'
import { ExpertApp } from '@backend/entities/ExpertApp'
import { Schedule } from '@backend/entities/Schedule'
import { Session } from '@backend/entities/Session'
import { User } from '@backend/entities/User'
import { WorkHistory } from '@backend/entities/WorkHistory'
import { ExpertAppService } from '@backend/expert/expert.service'
import { ImageModule } from '@backend/image/image.module'
import { CoinTransactionService } from '@backend/payment/coin-transaction.service'
import { SessionService } from '@backend/session/session.service'

import { ProfileController } from './profile.controller'
import { ProfileService } from './profile.service'

@Module({
  imports: [
    MikroOrmModule.forFeature([
      User,
      WorkHistory,
      ExpertApp,
      Session,
      Schedule,
      CoinTransaction,
      CoinTransactionLine,
    ]),
    ImageModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService, ExpertAppService, SessionService, CoinTransactionService],
  exports: [ProfileService],
})
export class ProfileModule {}
