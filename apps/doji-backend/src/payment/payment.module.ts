import { User } from '@libs/api'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
