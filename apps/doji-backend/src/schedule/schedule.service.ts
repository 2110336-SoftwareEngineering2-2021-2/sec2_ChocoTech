import { Schedule } from '@libs/api'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'

export interface ScheduleReference {
  id: number
  getSchedule(): Promise<Schedule>
}

@Injectable()
export class ScheduleService {
  constructor(@InjectRepository(Schedule) private readonly userRepo: EntityRepository<Schedule>) {}
}
