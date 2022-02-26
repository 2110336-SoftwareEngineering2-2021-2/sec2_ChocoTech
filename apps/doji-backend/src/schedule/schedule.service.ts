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
    const schedule = await this.scheduleRepo.findOne({ id: scheduleId })
    if (!schedule) return new NotFoundException('Schedule not found or you are not in the shcedule')
    const participant = await this.userScheduleRepo.findOne({
      scheduleId: scheduleId,
      username: user.username,
    })
    if (!participant)
      return new NotFoundException('Schedule not found or you are not in the shcedule')
    await this.userScheduleRepo.nativeDelete({
      scheduleId: scheduleId,
      username: user.username,
    })
    return
  }
}
