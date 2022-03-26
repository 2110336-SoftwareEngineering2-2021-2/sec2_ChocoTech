import { Service } from '@backend/entities/Service'
import { Session } from '@backend/entities/Session'
import { User } from '@backend/entities/User'
import {
  GetServiceByNameAndExpertUsernameDTO,
  ScheduleSessionDTO,
  ServiceInformationDTO,
} from '@backend/session/session.dto'
import { parseReviewStatFromAggreationResult } from '@backend/utils/review'
import { IReviewStatResponseDTO, ISession, IUserReference } from '@libs/api'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager } from '@mikro-orm/postgresql'
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session) private readonly sessionRepo: EntityRepository<Session>,
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
    @InjectRepository(Service) private readonly serviceRepo: EntityRepository<Service>,
    private readonly em: EntityManager,
  ) {}
  async schedule(dto: ScheduleSessionDTO, creator: User) {
    const service = await this.serviceRepo.findOne({
      name: dto.serviceName,
      expert: { username: dto.expertUsername },
    })

    // WARN: No NULL CHECK
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
  async getAllSession(userRef: IUserReference): Promise<ISession[]> {
    const user = await userRef.getUser()
    await user.sessions.init()
    const userSession = user.sessions.getItems()
    return userSession
  }

  async deleteSessionParticipant(sessionId: number, userRef: IUserReference) {
    const session = await this.sessionRepo.findOne({ id: sessionId })
    if (!session) {
      throw new NotFoundException('Session not found or you are not in the shcedule')
    }
    await session.participants.init()

    const user = await userRef.getUser()
    await user.sessions.init()

    const found = user.sessions.contains(session)
    if (!found) {
      throw new NotFoundException('Session not found or you are not in the shcedule')
    }
    user.sessions.remove(session)
    session.participants.remove(user as User)
    this.sessionRepo.flush()
    return
  }

  async getSessionInfo(id: number): Promise<Session | null> {
    return this.sessionRepo.findOne({ id: id }, ['reviews', 'reviews.user'])
  }

  async calculateReviewStatForSession(session: Session): Promise<IReviewStatResponseDTO> {
    const counts: { rating: number; count: string }[] = await this.em
      .createQueryBuilder(Session, 's')
      .select(['r.rating', 'count(*)'])
      .leftJoin('s.reviews', 'r')
      .groupBy('r.rating')
      .where({ id: session.id })
      .execute()
    return parseReviewStatFromAggreationResult(counts)
  }
}
