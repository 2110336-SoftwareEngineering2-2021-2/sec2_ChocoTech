export enum OnlineStatusEvent {
  SUBSCRIBE = 'subscribe',
  UNSUBSCRIBE = 'unsubscribe',
  STATUS_CHANGED = 'status-changed',
}

export interface ISubscriptionRequest {
  username: string
}

export interface IUnsubscriptionRequest {
  username: string
}

export interface IUserStatusResponse {
  username: string
  online: boolean
}
