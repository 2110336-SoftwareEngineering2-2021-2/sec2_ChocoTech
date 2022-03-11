import { UserReference } from '@backend/auth/auth.service'
import { Service } from '@backend/entities/Service'
import { Session } from '@backend/entities/Session'
import { User } from '@backend/entities/User'
import {
  GetServiceByNameAndExpertUsernameDTO,
  ScheduleSessionDTO,
  ServiceInformationDTO,
} from '@backend/session/session.dto'
import { EntityRepository, NotFoundError } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session) private readonly sessionRepo: EntityRepository<Session>,
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
    @InjectRepository(Service) private readonly serviceRepo: EntityRepository<Service>,
  ) {}
  async schedule(dto: ScheduleSessionDTO, userRef: UserReference) {
    const service = await this.serviceRepo.findOne({
      name: dto.serviceName,
      expert: { username: dto.expertUsername },
    })
    const creator = await userRef.getUser()
    const session = new Session()
    session.meetingProviderId = 'unknown'
    session.fee = dto.fee
    session.coinOnHold = dto.fee
    session.topic = service.name
    session.duration = dto.duration
    session.startTime = dto.startTime
    session.sourceId = 'unknown'
    session.creator = creator
    session.service = service
    session.participants.add(creator)
    await dto.participantsUsername.forEach((value) => {
      this.userRepo.findOne({ username: value }).then((user) => {
        session.participants.add(user)
      })
    })
    await this.sessionRepo.persistAndFlush(session)
  }
  async getServiceByNameAndExpertUsername(dto: GetServiceByNameAndExpertUsernameDTO) {
    const service = await this.serviceRepo.findOne({
      name: dto.serviceName,
      expert: { username: dto.expertUsername },
    })
    const expertData = await this.userRepo.findOne({ username: dto.expertUsername })
    if (service === null || expertData === null) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND)
    }
    const serviceInfo = new ServiceInformationDTO()
    serviceInfo.firstname = expertData.firstName
    serviceInfo.lastname = expertData.lastName
    serviceInfo.title = service.name
    serviceInfo.description = service.description
    serviceInfo.fee = service.fee
    return serviceInfo
  }
  async getAllSession(userRef: UserReference): Promise<Session[]> {
    const user = await userRef.getUser()
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

    return
  }
}
