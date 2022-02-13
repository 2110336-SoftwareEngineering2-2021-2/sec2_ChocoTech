import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { ExternalModule } from 'src/external/external.module'
import { MessagingGateway } from 'src/messaging/messaging.gateway'
import { MessagingService } from 'src/messaging/messaging.service'

@Module({
  imports: [ExternalModule, AuthModule],
  providers: [MessagingGateway, MessagingService],
})
export class MessagingModule {}
