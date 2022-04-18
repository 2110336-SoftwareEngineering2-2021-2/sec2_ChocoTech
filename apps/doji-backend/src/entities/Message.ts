import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { randomUUID } from 'crypto'

import { ChatRoom } from './ChatRoom'
import { User } from './User'

@Entity()
export class Message {
  @PrimaryKey()
  id: string = randomUUID()

  @Property()
  timestamp: string = new Date().toTimeString()

  @ManyToOne(() => User)
  author: User

  @ManyToOne(() => ChatRoom)
  chatRoom: ChatRoom

  @Property({ nullable: true })
  message: string

  @Property({ nullable: true })
  imageUrl: string

  constructor(author: User, { message, imageUrl }: { message?: string; imageUrl?: string }) {
    this.author = author
    this.message = message
    this.imageUrl = imageUrl
  }
}
