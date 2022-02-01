import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { User } from 'src/entities/User'

import { AuthController } from './auth.controller'

@Module({
  imports: [
    MikroOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
})
export class AuthModule {}
