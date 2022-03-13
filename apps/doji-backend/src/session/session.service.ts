import { UserReference } from '@backend/auth/auth.service'
import { Session } from '@backend/entities/Session'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class SessionService {
  constructor(@InjectRepository(Session) private readonly sessionRepo: EntityRepository<Session>) {}

  async getAllSession(userRef: UserReference): Promise<Session[]> {
    const user = await userRef.getUser()
    await user.sessions.init()
    const userSession = user.sessions.getItems()
    return userSession
  }

  async deleteSessionParticipant(sessionId: number, userRef: UserReference) {
    const session = await this.sessionRepo.findOne(sessionId)
    await session.participants.init()

    const user = await userRef.getUser()
    await user.sessions.init()

    const found = user.sessions.contains(session)
    if (!found) {
      throw new NotFoundException('Session not found or you are not in the shcedule')
    }
    user.sessions.remove(session)
    session.participants.remove(user)
    this.sessionRepo.flush()
    return
  }
}
