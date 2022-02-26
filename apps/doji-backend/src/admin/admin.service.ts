import { UserReference } from '@backend/auth/auth.service'
import { Admin } from '@backend/entities/Admin'
import { ExpertApp } from '@backend/entities/ExpertApp'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(ExpertApp) private readonly expertAppRepo: EntityRepository<ExpertApp>,
  ) {}

  async expertExpFromusername(username: string): Promise<ExpertApp | null> {
    const experience = await this.expertAppRepo.findOne({ username: username })
    if (!experience) return null
    return experience
  }
}
