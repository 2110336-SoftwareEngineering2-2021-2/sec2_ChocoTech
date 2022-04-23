import { IsString } from 'class-validator'

import { OnlineStatus } from '@backend/online-status/online-status'
import { SocketBusClientContext } from '@backend/online-status/socket-bus-client-context'
import { IUserReference } from '@backend/types'

import { ISubscriptionRequest, IUnsubscriptionRequest } from '@libs/api'

export class SubscriptionRequest implements ISubscriptionRequest {
  @IsString()
  username: string
}

export class UnsubscriptionRequest implements IUnsubscriptionRequest {
  @IsString()
  username: string
}

export interface OnlineStatusSocketContext {
  userRef: IUserReference
  busContext: SocketBusClientContext
  userOnlineStatus: OnlineStatus
}
