import { BusMessage } from '@backend/online-status/socket-bus.dto'
import { SocketBusService } from '@backend/online-status/socket-bus.service'

export class SocketBus {
  private listeners = new Set<SocketBusListener>()

  constructor(private readonly key: string, private readonly busService: SocketBusService) {}

  async broadcastEvent(event: string, data: any) {
    this.busService.sendRawMsg({
      busKey: this.key,
      eventKey: event,
      payload: data,
    })
  }

  registerListener(listener: SocketBusListener) {
    this.listeners.add(listener)
  }

  unregisterListener(listener: SocketBusListener) {
    this.listeners.delete(listener)
  }

  handleBusMessage(msg: BusMessage) {
    for (const listener of this.listeners) {
      listener.onBusMessage(msg.busKey, msg.eventKey, msg.payload)
    }
  }
}
