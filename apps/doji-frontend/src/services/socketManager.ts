import { Manager } from 'socket.io-client'

export const manager = new Manager(process.env.NEXT_PUBLIC_SOCKET_API_URL)
