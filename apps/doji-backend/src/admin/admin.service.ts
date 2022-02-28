import { AdminCreationRequestDTO } from '@backend/admin/admin.dto'
import { Admin } from '@backend/entities/Admin'
import { EntityRepository, UniqueConstraintViolationException } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import bcrypt from 'bcrypt'

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private readonly adminRepo: EntityRepository<Admin>) {}

  async adminCreation(dto: AdminCreationRequestDTO) {
    const newAdmin = new Admin()
    newAdmin.username = dto.username
    newAdmin.passwordHash = await bcrypt.hash(dto.password, 10)
    try {
      await this.adminRepo.persistAndFlush(newAdmin) //add to database
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new UnprocessableEntityException('Admin with this username already exist.')
      } else {
        throw e
      }
    }
    return
  }

  async getAllAdmin(): Promise<Admin[]> {
    const admin = await this.adminRepo.findAll()
    return admin
  }
}
