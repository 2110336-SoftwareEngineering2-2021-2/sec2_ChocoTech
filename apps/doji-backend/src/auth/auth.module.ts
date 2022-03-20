import { AuthService } from '@backend/auth/auth.service'
import { AuthStrategy } from '@backend/auth/cookie.strategy'
import { User } from '@backend/entities/User'
import { environment } from '@backend/environments/environment'
import { ExternalModule } from '@backend/external/external.module'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { MailgunModule } from '@nextnm/nestjs-mailgun'

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
    MailgunModule.forRoot({
      username: 'api',
      key: environment.mailgun.apiKey,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy, ThrottlerGuard],
  exports: [AuthService],
})
export class AuthModule {}
