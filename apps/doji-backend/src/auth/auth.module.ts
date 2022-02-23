import { AuthService } from '@backend/auth/auth.service'
import { BearerStrategy } from '@backend/auth/bearer.strategy'
import { ExternalModule } from '@backend/external/external.module'
import { User } from '@libs/api'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'

import { AuthController } from './auth.controller'

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    PassportModule,
    ExternalModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, BearerStrategy, ThrottlerGuard],
  exports: [AuthService],
})
export class AuthModule {}
