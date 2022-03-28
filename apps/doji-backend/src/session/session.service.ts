import { Schedule, ScheduleStatus } from '@backend/entities/Schedule'
import { Session } from '@backend/entities/Session'
import { User } from '@backend/entities/User'
import { CreateSessionRequestDTO, ScheduleSessionDTO } from '@backend/session/session.dto'
import { createGoogleOAuth2Client } from '@backend/utils/google'
import { parseReviewStatFromAggreationResult } from '@backend/utils/review'
import { IReviewStatResponseDTO, ISchedule, ISession } from '@libs/api'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager } from '@mikro-orm/postgresql'
import { Injectable, NotFoundException } from '@nestjs/common'
import { google } from 'googleapis'

@Injectable()
export class SessionService {
  private readonly oauth2Client = createGoogleOAuth2Client()
  private readonly googleCalendar = google.calendar({
    version: 'v3',
    auth: this.oauth2Client,
  })

  constructor(
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
    @InjectRepository(Session) private readonly sessionRepo: EntityRepository<Session>,
    @InjectRepository(Schedule) private readonly scheduleRepo: EntityRepository<Schedule>,
    private readonly em: EntityManager,
  ) {}

  async getSession(sessionId: string) {
    const session = await this.sessionRepo.findOne({ id: sessionId }, [
      'owner',
      'reviews',
      'reviews.user',
    ])

    if (session === null || session.owner === null) {
      throw new NotFoundException('Service not found')
    }

    return session
  }

  async getAllSessionsByExpert(expertUsername?: string): Promise<Session[]> {
    try {
      const sessions = await this.sessionRepo.find(
        {
          owner: {
            username: expertUsername,
          },
        },
        ['owner', 'reviews', 'reviews.user'],
      )
      return sessions
    } catch (err) {
      throw new NotFoundException('Service not found')
    }
  }

  async create(dto: CreateSessionRequestDTO, owner: User): Promise<ISession> {
    const session = new Session()
    session.owner = owner
    session.topic = dto.topic
    session.description = dto.description
    session.fee = dto.fee
    await this.sessionRepo.persistAndFlush(session)
    return session
  }

  async schedule(dto: ScheduleSessionDTO, creator: User): Promise<ISchedule> {
    const session = await this.sessionRepo.findOne(
      {
        topic: dto.serviceName,
        owner: { username: dto.expertUsername },
      },
      ['owner'],
    )

    // WARN: No NULL CHECK
    const schedule = new Schedule()
    schedule.session = session
    schedule.coinOnHold = 0
    schedule.duration = dto.duration
    schedule.startTime = dto.startTime
    schedule.participants.add(creator)

    try {
      const usenameFilter = dto.participantsUsername.map((u) => ({ username: u }))
      const participants = await this.userRepo.find({
        $or: usenameFilter,
      })
      participants.forEach((participant) => {
        schedule.participants.add(participant)
      })
      await this.scheduleRepo.persistAndFlush(schedule)
      return schedule
    } catch (e) {
      throw new NotFoundException('Users not found')
    }
  }

  async acceptSchedule(scheduleId: string): Promise<ISchedule> {
    const schedule = await this.scheduleRepo.findOne({ id: scheduleId }, ['session'])
    schedule.status = ScheduleStatus.ACCEPTED
    const { session, participants, creator } = schedule

    /**
     * Data preparation for creating google calendar event
     */
    const endTime = new Date(
      schedule.startTime.getMilliseconds() + schedule.duration * 60 * 60 * 1000,
    )
    const attendeeEmails = [
      ...participants.getItems().map((p) => ({ email: p.email })),
      { email: creator.email },
      { email: session.owner.email },
    ]
    /**
     * Add Google Calendar event to get google meet link
     */
    const response = await this.googleCalendar.events.insert({
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
          conferenceSolution: {
            key: {
              type: 'hangoutsMeet',
            },
          },
        },
      },
    })
    schedule.meetUrl = response.data.conferenceData.entryPoints[0].uri

    await this.scheduleRepo.persistAndFlush(schedule)
    return schedule
  }

  async getMySchedules(user: User): Promise<ISchedule[]> {
    await user.schedules.init()
    const schedules = user.schedules.getItems()
    return schedules
  }

  async removeParticipant(scheduleId: string, targetUser: User) {
    try {
      const schedule = await this.scheduleRepo.findOneOrFail({ id: scheduleId }, ['participants'])
      await targetUser.schedules.init()

      if (!targetUser.schedules.contains(schedule)) {
        throw new NotFoundException('Session not found or you are not in the shcedule')
      }

      targetUser.schedules.remove(schedule)
      schedule.participants.remove(targetUser)

      await this.scheduleRepo.persistAndFlush(schedule)
      await this.userRepo.persistAndFlush(targetUser)
    } catch (err) {
      throw new NotFoundException('Session not found or you are not in the shcedule')
    }
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
