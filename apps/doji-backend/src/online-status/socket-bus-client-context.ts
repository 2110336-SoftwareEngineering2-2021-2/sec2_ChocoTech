import { Socket } from 'socket.io'

import { SocketBus } from '@backend/online-status/socket-bus'

export class SocketBusClientContext implements SocketBusListener {
  private subscriptions = new Set<SocketBus>()

  constructor(private readonly client: Socket) {}

  cleanUp() {
    this.subscriptions.forEach((bus) => bus.unregisterListener(this))
  }

  subscribe(bus: SocketBus) {
    bus.registerListener(this)
    this.subscriptions.add(bus)
  }

  unsubscribe(bus: SocketBus) {
    bus.unregisterListener(this)
    this.subscriptions.delete(bus)
  }

  onBusMessage(busKey: string, eventKey: string, body: any) {
    this.client.emit(eventKey, body)
  }
}
