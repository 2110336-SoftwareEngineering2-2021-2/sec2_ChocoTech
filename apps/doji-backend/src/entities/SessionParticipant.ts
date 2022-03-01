import { ISessionParticipant } from '@libs/api'
import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core'

import { Session } from '../entities/Session'
import { User } from '../entities/User'

@Entity()
export class SessionParticipant implements ISessionParticipant {
  @ManyToOne({ primary: true })
  session: Session
  @ManyToOne({ primary: true })
  user: User
}
