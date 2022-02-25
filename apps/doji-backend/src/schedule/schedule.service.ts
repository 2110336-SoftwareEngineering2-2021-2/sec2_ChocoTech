import { UserReference } from '@backend/auth/auth.service'
import { Schedule, User_Schedule } from '@libs/api'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule) private readonly scheduleRepo: EntityRepository<Schedule>,
    @InjectRepository(User_Schedule)
    private readonly userScheduleRepo: EntityRepository<User_Schedule>,
  ) {}

  async scheduleFromId(scheduleId: number): Promise<Schedule | null> {
    const schedule = await this.scheduleRepo.findOne({ id: scheduleId })
    if (!schedule) return null
    return schedule
  }

  async deleteScheduleParticipant(scheduleId: number, userRef: UserReference) {
    const user = await userRef.getUser()
    try {
      await this.scheduleRepo.findOne({ id: scheduleId })
      await this.userScheduleRepo.findOne({ scheduleId: scheduleId, username: user.username })
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException('Schedule not found or you are not in the shcedule')
      } else {
        throw e
      }
    }
    const num = await this.userScheduleRepo.nativeDelete({
      scheduleId: scheduleId,
      username: user.username,
    })
    if (num === 0) {
      throw new NotFoundException('Schedule not found or you are not in the shcedule')
    }
    return
  }
}
