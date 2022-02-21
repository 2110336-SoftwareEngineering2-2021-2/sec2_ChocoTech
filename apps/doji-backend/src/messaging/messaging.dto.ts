import { IAuthHandshake, IListenOnlineStatusRequest, IOnlineStatusEvent } from '@libs/api'
import { IsString } from 'class-validator'

export class AuthHandshake implements IAuthHandshake {
  @IsString()
  token: string
}

export class ListenOnlineStatusRequest implements IListenOnlineStatusRequest {
  @IsString()
  username: string
}

export class OnlineStatusEvent implements IOnlineStatusEvent {
  username: string
  isOnline: boolean
}
