import { useEffect } from 'react'
import { QueryClient, useQuery } from 'react-query'
import { Socket, io } from 'socket.io-client'

import { queryClient } from '@frontend/services'

import {
  ISubscriptionRequest,
  IUnsubscriptionRequest,
  IUserStatusResponse,
  OnlineStatusEvent,
  SocketNamespace,
} from '@libs/api'

export class OnlineStatusTrackingEntry {
  username: string
  online: boolean
  refCount: number
  queryKey: string

  constructor(
    username: string,
    private readonly queryClient: QueryClient,
    private readonly socketControl: OnlineStatusSocketControl,
  ) {
    this.username = username
    this.online = false
    this.refCount = 0
    this.queryKey = `online-status:${username}`
  }

  updateStatus(newOnlineStatus: boolean) {
    this.online = newOnlineStatus
    this.queryClient.invalidateQueries(this.queryKey)
  }

  incrementRefCount() {
    this.refCount++
    if (this.refCount == 1)
      this.socketControl.subscribe(this.username).then((res) => this.updateStatus(res.online))
  }

  decrementRefCount() {
    this.refCount--
    if (this.refCount == 0) this.socketControl.unsubscribe(this.username)
  }
}

interface OnlineStatusSocketControl {
  subscribe(username: string): Promise<IUserStatusResponse>
  unsubscribe(username: string)
}

export class OnlineStatusFactory {
  private client: Socket
  private trackingEntries: Map<string, OnlineStatusTrackingEntry>
  private socketControl: OnlineStatusSocketControl

  constructor(private readonly queryClient: QueryClient) {
    this.client = io(SocketNamespace.ONLINE_STATUS)
    this.trackingEntries = new Map()
    this.client.on(OnlineStatusEvent.STATUS_CHANGED, (e: IUserStatusResponse) => {
      const entry = this.trackingEntries.get(e.username)
      if (!entry) return
      entry.updateStatus(e.online)
    })
    this.socketControl = {
      subscribe: (username: string) => {
        const req: ISubscriptionRequest = { username }
        return new Promise((resolve, _) => {
          this.client.emit(OnlineStatusEvent.SUBSCRIBE, req, resolve)
        })
      },
      unsubscribe: (username: string) => {
        const req: IUnsubscriptionRequest = { username }
        this.client.emit(OnlineStatusEvent.UNSUBSCRIBE, req)
      },
    }
  }

  getTrackingEntry(username: string) {
    let entry = this.trackingEntries.get(username)
    if (!entry) {
      entry = new OnlineStatusTrackingEntry(username, this.queryClient, this.socketControl)
      this.trackingEntries.set(username, entry)
    }
    return entry
  }
}

const onlineStatusFactory = new OnlineStatusFactory(queryClient)

export function useOnlineStatus(username: string) {
  const entry = onlineStatusFactory.getTrackingEntry(username)
  const { data } = useQuery(entry.queryKey, () => entry.online)

  useEffect(() => {
    entry.incrementRefCount()

    return () => {
      entry.decrementRefCount()
    }
  }, [username])

  return data
}
