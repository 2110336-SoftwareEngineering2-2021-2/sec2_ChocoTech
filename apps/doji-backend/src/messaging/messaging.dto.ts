import { messaging } from '@sec2-choco-tech/api'
import { IsString } from 'class-validator'

export class AuthHandshake implements messaging.IAuthHandshake {
  @IsString()
  token: string
}

export class ListenOnlineStatusRequest implements messaging.IListenOnlineStatusRequest {
  @IsString()
  username: string
}

export class OnlineStatusEvent implements messaging.IOnlineStatusEvent {
  username: string
  isOnline: boolean
}
