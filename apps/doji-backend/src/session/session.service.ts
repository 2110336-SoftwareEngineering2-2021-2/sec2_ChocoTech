import { UserReference } from '@backend/auth/auth.service'
import { Service } from '@backend/entities/Service'
import { Session } from '@backend/entities/Session'
import { User } from '@backend/entities/User'
import {
  GetServiceByNameAndExpertUsernameDTO,
  ScheduleSessionDTO,
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
    const service = await this.serviceRepo.findOneOrFail({
      $and: [{ expert: { username: dto.expertUsername } }, { name: dto.serviceName }],
    })
    const creator = await userRef.getUser()
    const session = new Session()
    session.meetingProviderId = 'unknown'
    session.fee = dto.fee
    session.coinOnHold = dto.fee
    session.topic = service.name
    session.duration = dto.duration
    session.startTime = new Date(dto.startTime)
    session.soruceId = 'unknown'
    session.creator = creator
    session.service = service
    session.participants.add(creator)
    await dto.participantsUsername.forEach((value) => {
      this.userRepo.findOneOrFail({ username: value }).then((user) => {
        session.participants.add(user)
      })
    })
    this.sessionRepo.persistAndFlush(session)
  }
  async getServiceByNameAndExpertUsername(dto: GetServiceByNameAndExpertUsernameDTO) {
    let service: Service
    let expertData: User
    try {
      service = await this.serviceRepo.findOneOrFail({
        $and: [{ expert: { username: dto.expertUsername } }, { name: dto.serviceName }],
      })
    } catch (error) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND)
    }
    try {
      expertData = await this.userRepo.findOneOrFail({ username: dto.expertUsername })
    } catch (error) {
      throw new HttpException('Expert not found', HttpStatus.NOT_FOUND)
    }
    return Object({
      firstname: expertData.firstName,
      lastname: expertData.lastName,
      title: service.name,
      description: service.description,
      fee: service.fee,
    })
  }
}
