import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from 'src/auth/auth.service'
import { BearerStrategy } from 'src/auth/bearer.strategy'
import { User } from 'src/entities/User'
import { ExternalModule } from 'src/external/external.module'

import { AuthController } from './auth.controller'

@Module({
  imports: [MikroOrmModule.forFeature([User]), PassportModule, ExternalModule],
  controllers: [AuthController],
  providers: [AuthService, BearerStrategy],
})
export class AuthModule {}
