import { AuthService } from '@backend/auth/auth.service'
import { BearerStrategy } from '@backend/auth/bearer.strategy'
import { User } from '@backend/entities/User'
import { ExternalModule } from '@backend/external/external.module'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { AuthController } from './auth.controller'

@Module({
  imports: [MikroOrmModule.forFeature([User]), PassportModule, ExternalModule],
  controllers: [AuthController],
  providers: [AuthService, BearerStrategy],
  exports: [AuthService],
})
export class AuthModule {}
