import { AuthService } from '@backend/auth/auth.service'
import { BearerStrategy } from '@backend/auth/bearer.strategy'
import { User } from '@backend/entities/User'
import { environment } from '@backend/environments/environment'
import { ExternalModule } from '@backend/external/external.module'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
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
    JwtModule.register({
      secret: environment.jwt.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, BearerStrategy, ThrottlerGuard],
  exports: [AuthService],
})
export class AuthModule {}
