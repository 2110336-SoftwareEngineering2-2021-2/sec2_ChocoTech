import { IsString } from 'class-validator'

export class AuthHandshake {
  @IsString()
  token: string
}

export class ListenOnlineStatusRequest {
  @IsString()
  username: string
}

export class OnlineStatusEvent {
  username: string
  isOnline: boolean
}
