export enum ServerEvent {
  ONLINE_STATUS_CHANGE = 'online-status-change',
}

export enum ClientEvent {
  LISTEN_ONLINE_STATUS = 'listen-online-status',
}

export interface IAuthHandshake {
  token: string
}

export interface IListenOnlineStatusRequest {
  username: string
}

export interface IOnlineStatusEvent {
  username: string
  isOnline: boolean
}
