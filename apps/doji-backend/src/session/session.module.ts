import { AuthModule } from '@backend/auth/auth.module'
import { Service } from '@backend/entities/Service'
import { Session } from '@backend/entities/Session'
import { User } from '@backend/entities/User'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

import { SessionController } from './session.controller'
import { SessionService } from './session.service'

@Module({
  imports: [MikroOrmModule.forFeature([User, Session, Service]), AuthModule],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
