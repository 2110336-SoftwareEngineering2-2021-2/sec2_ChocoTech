import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

import { AuthModule } from '@backend/auth/auth.module'
import { ChatRoom } from '@backend/entities/ChatRoom'
import { Message } from '@backend/entities/Message'
import { User } from '@backend/entities/User'
import { ExternalModule } from '@backend/external/external.module'
import { ImageModule } from '@backend/image/image.module'
import { ImageService } from '@backend/image/image.service'

import { ChatController } from './chat.controller'
import { ChatGateway } from './chat.gateway'
import { ChatService } from './chat.service'

@Module({
  controllers: [ChatController],

  imports: [
    ExternalModule,
    AuthModule,
    MikroOrmModule.forFeature([User, ChatRoom, Message]),
    ImageModule,
  ],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
