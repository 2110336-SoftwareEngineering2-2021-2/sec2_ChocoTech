import { Collection, Entity, ManyToMany, OneToMany, PrimaryKey, Property } from '@mikro-orm/core'
import { randomUUID } from 'crypto'

import { Message } from './Message'
import { User } from './User'

@Entity()
export class ChatRoom {
  @PrimaryKey()
  id: string

  @Property({ nullable: true })
  name: string

  @ManyToMany(() => User, 'chatRooms', { owner: true })
  participants = new Collection<User>(this)

  @OneToMany(() => Message, (message) => message.chatRoom)
  messages = new Collection<Message>(this)

  constructor() {
    this.id = randomUUID()
  }
}
