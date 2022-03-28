import { AuthModule } from '@backend/auth/auth.module'
import { Schedule } from '@backend/entities/Schedule'
import { Session } from '@backend/entities/Session'
import { User } from '@backend/entities/User'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

import { SessionController } from './session.controller'
import { SessionService } from './session.service'

@Module({
  imports: [MikroOrmModule.forFeature([User, Session, Schedule]), AuthModule],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
