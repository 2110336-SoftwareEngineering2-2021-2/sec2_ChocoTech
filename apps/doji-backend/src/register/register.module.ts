import { User } from '@libs/api'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

import { RegisterController } from './register.controller'
import { RegisterService } from './register.service'

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [RegisterService],
})
export class RegisterModule {}
