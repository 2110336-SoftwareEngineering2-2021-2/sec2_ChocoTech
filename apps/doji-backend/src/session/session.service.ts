import { UserReference } from '@backend/auth/auth.service'
import { Session } from '@backend/entities/Session'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class SessionService {
  constructor(@InjectRepository(Session) private readonly SessionRepo: EntityRepository<Session>) {}

  async getAllSession(): Promise<Session[]> {
    return await this.SessionRepo.findAll()
  }

  async deleteSessionParticipant(SessionId: number, userRef: UserReference) {
    const user = await userRef.getUser()
    const Session = await this.SessionRepo.findOne({ id: SessionId })
    if (!Session) {
      throw new NotFoundException('Session not found or you are not in the shcedule')
    }
    const num = await this.userSessionRepo.nativeDelete({
      SessionId: SessionId,
      username: user.username,
    })
    if (num === 0) {
      throw new NotFoundException('Session not found or you are not in the shcedule')
    }
    return
  }
}
