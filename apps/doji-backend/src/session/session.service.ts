import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager } from '@mikro-orm/postgresql'
import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { google } from 'googleapis'

import { Schedule, ScheduleStatus } from '@backend/entities/Schedule'
import { Session } from '@backend/entities/Session'
import { User } from '@backend/entities/User'
import {
  CoinTransactionService,
  InsufficientFundError,
} from '@backend/payment/coin-transaction.service'
import {
  CreateSessionRequestDTO,
  ScheduleSessionDTO,
  ScheudleResponseDTO,
} from '@backend/session/session.dto'
import { createGoogleOAuth2Client } from '@backend/utils/google'
import { parseReviewStatFromAggreationResult } from '@backend/utils/review'

import {
  IReviewStatResponseDTO,
  ISchedule,
  IScheduleResponseDTO,
  ISession,
  ISessionStatResponseDTO,
} from '@libs/api'

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name)
  constructor(
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
    @InjectRepository(Session) private readonly sessionRepo: EntityRepository<Session>,
    @InjectRepository(Schedule) private readonly scheduleRepo: EntityRepository<Schedule>,
    private readonly em: EntityManager,
    private readonly transaction: CoinTransactionService,
    private readonly entityManager: EntityManager,
  ) {}

  async getSession(sessionId: string): Promise<ISessionStatResponseDTO> {
    const session = await this.sessionRepo.findOne({ id: sessionId }, [
      'owner',
      'reviews',
      'reviews.user',
    ])
    const sessionJSON = wrap(session).toJSON()
    sessionJSON.reviews = sessionJSON.reviews.reverse()
    const reviewStat = await this.calculateReviewStatForSession(sessionId)
    return { ...sessionJSON, reviewStat } as ISessionStatResponseDTO
  }

  async getAllSessions(): Promise<ISession[]> {
    try {
      const sessions = await this.sessionRepo.findAll(['owner', 'reviews', 'reviews.user'])
      const sessionsJSON = sessions.map((s) => wrap(s).toJSON()).reverse()
      return sessionsJSON as ISession[]
    } catch (err) {
      console.log(err)
      throw new NotFoundException('Session not found')
    }
  }

  async getSessionsByExpert(username: string): Promise<ISession[]> {
    const user = await this.userRepo.findOne({ username: username })
    if (!user) {
      throw new NotFoundException('Expert not found')
    }

    try {
      const query = this.entityManager
        .createQueryBuilder(Session, 'r')
        .select(['*'])
        .where({ owner: user })

      return (await query.execute()) as ISession[]
    } catch (err) {
      return [] as ISession[]
    }
  }

  async getRequestedSchedule(expert: User): Promise<ScheudleResponseDTO[]> {
    try {
      const schedules = await this.scheduleRepo.find(
        {
          session: { owner: expert },
          status: ScheduleStatus.PENDING,
        },
        ['participants', 'session', 'creator'],
      )
      const schedulesJSON = schedules.map((s) => wrap(s).toJSON())
      return schedulesJSON as ScheudleResponseDTO[]
    } catch (err) {
      throw new NotFoundException('Schedule not found')
    }
  }

  // async getAllSessionsByExpert(expertUsername?: string): Promise<Session[]> {
  //   try {
  //     const sessions = await this.sessionRepo.find(
  //       {
  //         owner: {
  //           username: expertUsername,
  //         },
  //       },
  //       ['owner', 'reviews', 'reviews.user'],
  //     )
  //     return sessions
  //   } catch (err) {
  //     throw new NotFoundException('Service not found')
  //   }
  // }

  async create(dto: CreateSessionRequestDTO, owner: User): Promise<ISession> {
    const session = new Session()
    session.owner = owner
    session.topic = dto.topic
    session.description = dto.description
    session.fee = dto.fee

    await this.sessionRepo.persistAndFlush(session)
    return wrap(session).toJSON() as ISession
  }

  async schedule(dto: ScheduleSessionDTO, creator: User): Promise<ISchedule> {
    const session = await this.sessionRepo.findOne({ id: dto.sessionId }, ['owner'])

    // WARN: No NULL CHECK
    const schedule = new Schedule()
    schedule.creator = creator
    schedule.session = session
    schedule.coinOnHold = dto.coinOnHold
    schedule.duration = dto.duration
    schedule.startTime = dto.startTime
    schedule.participants.add(creator)
    try {
      await this.transaction.payForService(creator, dto.coinOnHold)
    } catch (e) {
      if (e instanceof InsufficientFundError) {
        throw new HttpException('Insufficient coin', HttpStatus.NOT_ACCEPTABLE)
      } else {
        throw new HttpException('An error occur', HttpStatus.NOT_IMPLEMENTED)
      }
    }
    try {
      const usenameFilter = [
        ...dto.participantsUsername.map((u) => ({ username: u })),
        { username: creator.username },
      ]
      const participants = await this.userRepo.find({
        $or: usenameFilter,
      })

      participants.forEach((participant) => {
        schedule.participants.add(participant)
      })
      await this.scheduleRepo.persistAndFlush(schedule)

      return wrap(schedule).toJSON() as ISchedule
    } catch (e) {
      console.error(e)
      throw new NotFoundException('Users not found')
    }
  }

  private async _bookGoogleCalendar(schedule: Schedule): Promise<ISchedule> {
    const { session, participants, creator } = schedule
    /**
     * Prepare Google Oauth2 client and calendar
     */
    const oauth2Client = createGoogleOAuth2Client()
    oauth2Client.credentials = {
      refresh_token: creator.googleRefreshToken,
    }
    const googleCalendar = google.calendar({
      version: 'v3',
      auth: oauth2Client,
    })

    /**
     * Data preparation for creating google calendar event
     */
    const endTime = new Date(schedule.startTime)
    endTime.setHours(endTime.getHours() + schedule.duration)

    const attendeeEmails = [
      ...participants.getItems().map((p) => ({ email: p.email })),
      { email: creator.email },
      { email: session.owner.email },
    ]
    /**
     * Add Google Calendar event to get google meet link
     */
    try {
      const response = await googleCalendar.events.insert({
        calendarId: 'primary',
        requestBody: {
          summary: session.topic,
          description: session.description,
          start: {
            dateTime: schedule.startTime.toISOString(), // RFC3339 format for example: 2018-04-05T09:00:00-07:00
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
            createRequest: {
              requestId: randomUUID(),
              conferenceSolutionKey: {
                type: 'hangoutsMeet',
              },
            },
          },
        },
        conferenceDataVersion: 1,
      })
      schedule.meetId = response.data.id
      schedule.meetUrl = response.data.hangoutLink
      await this.scheduleRepo.persistAndFlush(schedule)
      return wrap(schedule).toJSON() as ISchedule
    } catch (err) {
      this.logger.error(err)
    }
  }

  async changeScheduleStatus(scheduleId: string, status: ScheduleStatus): Promise<ISchedule> {
    const schedule = await this.scheduleRepo.findOne({ id: scheduleId }, [
      'session',
      'participants',
      'session.owner',
    ])
    schedule.status = status
    if (status === ScheduleStatus.ACCEPTED) {
      await this._bookGoogleCalendar(schedule)
    }
    await this.scheduleRepo.persistAndFlush(schedule)

    return wrap(schedule).toJSON() as ISchedule
  }

  async getMySchedules(user: User): Promise<IScheduleResponseDTO[]> {
    const mySchedules = await this.scheduleRepo.find({ participants: [user] }, [
      'session',
      'participants',
      'session.owner',
    ])
    const schedulesJSON = mySchedules.map((s) => wrap(s).toJSON())
    return schedulesJSON as IScheduleResponseDTO[]
  }

  async deleteSchedule(scheduleId: string, targetUser: User) {
    try {
      const schedule = await this.scheduleRepo.findOneOrFail({ id: scheduleId }, [
        'creator',
        'participants',
      ])
      const penalty = this.hasPenalty(schedule.startTime)
      let refundAmount = 0
      if (penalty) {
        refundAmount = schedule.coinOnHold - schedule.coinOnHold * 0.3
      } else {
        refundAmount = schedule.coinOnHold
      }
      await this.transaction.refundForService(schedule.creator, refundAmount)
      if (schedule.creator.username === targetUser.username) {
        await this.scheduleRepo.removeAndFlush(schedule)
      }
    } catch (err) {
      throw new NotFoundException('Schedule not found')
    }
  }

  async calculateReviewStatForSession(sessionId: string): Promise<IReviewStatResponseDTO> {
    const counts: { rating: number; count: string }[] = await this.em
      .createQueryBuilder(Session, 's')
      .select(['r.rating', 'count(*)'])
      .leftJoin('s.reviews', 'r')
      .groupBy('r.rating')
      .where({ id: sessionId })
      .execute()

    return parseReviewStatFromAggreationResult(counts)
  }

  async hasPenalty(startTime: Date) {
    const dateStart = new Date(startTime)
    const dateCurrent = new Date()

    const DifferenceInTime = dateCurrent.getTime() - dateStart.getTime()

    const DifferenceInDays = DifferenceInTime / (1000 * 3600 * 24)

    if (DifferenceInDays > 3) {
      return false
    }
    return true
  }
}
