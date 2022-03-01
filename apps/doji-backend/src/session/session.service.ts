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
    const userSession = user.sessions.getItems()
    console.log(userSession)
    return userSession
  }

  async deleteSessionParticipant(sessionId: number, userRef: UserReference) {
    const user = await userRef.getUser()
    const session = await this.sessionRepo.findOne(sessionId)
    const found = user.sessions.contains(session)
    if (!found) {
      throw new NotFoundException('Session not found or you are not in the shcedule')
    }
    user.sessions.remove(session)
    return
  }
}
