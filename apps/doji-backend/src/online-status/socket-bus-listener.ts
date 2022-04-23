interface SocketBusListener {
  onBusMessage(busKey: string, eventKey: string, body: any)
}
