import { useEffect } from 'react'
import { Socket, io } from 'socket.io-client'
import create, { UseBoundStore } from 'zustand'

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
    private readonly onlineStatusStore: UseBoundStore<Map<string, boolean>>,
    private readonly socketControl: OnlineStatusSocketControl,
  ) {
    this.username = username
    this.online = false
    this.refCount = 0
    this.queryKey = `online-status:${username}`
  }

  updateStatus(newOnlineStatus: boolean) {
    this.online = newOnlineStatus
    this.onlineStatusStore.setState(
      (state) => new Map([...Array.from(state), [this.username, newOnlineStatus]]),
    )
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
  unsubscribe(username: string): void
}

export class OnlineStatusFactory {
  private client: Socket
  private trackingEntries: Map<string, OnlineStatusTrackingEntry>
  private socketControl: OnlineStatusSocketControl

  onlineStatusStore = create(() => new Map<string, boolean>())

  constructor() {
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
      entry = new OnlineStatusTrackingEntry(username, this.onlineStatusStore, this.socketControl)
      this.trackingEntries.set(username, entry)
    }
    return entry
  }
}

const onlineStatusFactory = new OnlineStatusFactory()

export function useOnlineStatus(username: string) {
  const entry = onlineStatusFactory.getTrackingEntry(username)

  useEffect(() => {
    entry.incrementRefCount()

    return () => {
      entry.decrementRefCount()
    }
  }, [username])

  return onlineStatusFactory.onlineStatusStore((state) => state.get(username))
}
