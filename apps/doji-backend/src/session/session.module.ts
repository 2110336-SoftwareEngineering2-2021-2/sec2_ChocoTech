import { Session } from '@backend/entities/Session'
import { SessionController } from '@backend/session/session.controller'
import { SessionService } from '@backend/session/session.service'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

@Module({
  imports: [MikroOrmModule.forFeature([Session])],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
