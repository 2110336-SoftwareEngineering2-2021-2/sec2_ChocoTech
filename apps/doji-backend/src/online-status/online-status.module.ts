import { Module } from '@nestjs/common'

import { AuthModule } from '@backend/auth/auth.module'
import { ExternalModule } from '@backend/external/external.module'
import { OnlineStatusGateway } from '@backend/online-status/online-status.gateway'
import { OnlineStatusService } from '@backend/online-status/online-status.service'
import { SocketBusService } from '@backend/online-status/socket-bus.service'

@Module({
  imports: [AuthModule, ExternalModule],
  providers: [OnlineStatusGateway, OnlineStatusService, SocketBusService],
})
export class OnlineStatusModule {}
