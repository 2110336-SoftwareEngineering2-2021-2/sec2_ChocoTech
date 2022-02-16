import { AuthModule } from '@backend/auth/auth.module'
import { ExternalModule } from '@backend/external/external.module'
import { MessagingGateway } from '@backend/messaging/messaging.gateway'
import { MessagingService } from '@backend/messaging/messaging.service'
import { Module } from '@nestjs/common'

@Module({
  imports: [ExternalModule, AuthModule],
  providers: [MessagingGateway, MessagingService],
})
export class MessagingModule {}
