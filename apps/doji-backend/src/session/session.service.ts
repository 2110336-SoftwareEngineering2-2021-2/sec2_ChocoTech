import { Service } from '@backend/entities/Service'
import { Session } from '@backend/entities/Session'
import { User } from '@backend/entities/User'
import {
  GetServiceByNameAndExpertUsernameDTO,
  ScheduleSessionDTO,
  ServiceInformationDTO,
} from '@backend/session/session.dto'
import { createGoogleOAuth2Client } from '@backend/utils/google'
import { parseReviewStatFromAggreationResult } from '@backend/utils/review'
import { IReviewStatResponseDTO, ISession, IUserReference } from '@libs/api'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager } from '@mikro-orm/postgresql'
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { google } from 'googleapis'

@Injectable()
export class SessionService {
  private readonly oauth2Client = createGoogleOAuth2Client()
  private readonly googleCalendar = google.calendar({
    version: 'v3',
    auth: this.oauth2Client,
  })

  constructor(
    @InjectRepository(Session) private readonly sessionRepo: EntityRepository<Session>,
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
    @InjectRepository(Service) private readonly serviceRepo: EntityRepository<Service>,
    private readonly em: EntityManager,
  ) {}

  async schedule(dto: ScheduleSessionDTO, creator: User): Promise<ISession> {
    const service = await this.serviceRepo.findOne({
      name: dto.serviceName,
      expert: { username: dto.expertUsername },
    })

    // WARN: No NULL CHECK
    const session = new Session()
    session.fee = dto.fee
    session.coinOnHold = 0
    session.topic = service.name
    session.duration = dto.duration
    session.startTime = dto.startTime
    session.creator = creator
    session.service = service
    session.participants.add(creator)

    try {
      const usenameFilter = dto.participantsUsername.map((u) => ({ username: u }))
      const participants = await this.userRepo.find({
        $or: usenameFilter,
      })
      participants.forEach((participant) => {
        session.participants.add(participant)
      })

      /**
       * Data preparation for creating google calendar event
       */
      const endTime = new Date(
        session.startTime.getMilliseconds() + session.duration * 60 * 60 * 1000,
      )
      const attendeeEmails = [
        ...participants.map((p) => ({ email: p.email })),
        { email: creator.email },
      ]
      /**
       * Add Google Calendar event to get google meet link
       */
      const response = await this.googleCalendar.events.insert({
        calendarId: 'primary',
        requestBody: {
          summary: session.topic,
          start: {
            dateTime: session.startTime.toISOString(), // RFC3339 format for example: 2018-04-05T09:00:00-07:00
            timeZone: 'Asia/Bangkok',
          },
          end: {
            dateTime: endTime.toISOString(), // RFC3339 format for example: 2018-04-05T09:00:00-07:00
            timeZone: 'Asia/Bangkok',
          },
          attendees: attendeeEmails,
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'email', minutes: 24 * 60 },
              { method: 'popup', minutes: 10 },
            ],
          },
          creator: {
            email: creator.email,
          },
          conferenceData: {
            conferenceSolution: {
              key: {
                type: 'hangoutsMeet',
              },
            },
          },
        },
      })
      session.meetUrl = response.data.conferenceData.entryPoints[0].uri

      await this.sessionRepo.persistAndFlush(session)
      return session
    } catch (e) {
      throw new NotFoundException('Users not found')
    }
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

  async deleteSessionParticipant(sessionId: string, userRef: IUserReference) {
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

  async getSessionInfo(id: string): Promise<Session | null> {
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
