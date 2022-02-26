import { UserReference } from '@backend/auth/auth.service'
import { Schedule } from '@backend/entities/Schedule'
import { UserSchedule } from '@backend/entities/UserSchedule'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule) private readonly scheduleRepo: EntityRepository<Schedule>,
    @InjectRepository(UserSchedule)
    private readonly userScheduleRepo: EntityRepository<UserSchedule>,
  ) {}

  async scheduleFromId(scheduleId: number): Promise<Schedule | null> {
    const schedule = await this.scheduleRepo.findOne({ id: scheduleId })
    if (!schedule) return null
    return schedule
  }

  async deleteScheduleParticipant(scheduleId: number, userRef: UserReference) {
    const user = await userRef.getUser()
    const schedule = await this.scheduleRepo.findOne({ id: scheduleId })
    if (!schedule) {
      throw new NotFoundException('Schedule not found or you are not in the shcedule')
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
