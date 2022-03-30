import {
  AdminCreationRequestDTO,
  ApproveExpertDetailDTO,
  ChangeUserRole,
} from '@backend/admin/admin.dto'
import { Admin } from '@backend/entities/Admin'
import { ExpertApp } from '@backend/entities/ExpertApp'
import { User, UserRole } from '@backend/entities/User'
import { WorkHistory } from '@backend/entities/WorkHistory'
import { IWorkHistory } from '@libs/api'
import { EntityRepository, UniqueConstraintViolationException, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common'
import bcrypt from 'bcrypt'

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: EntityRepository<Admin>,
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
    @InjectRepository(WorkHistory) private readonly workHistoryRepo: EntityRepository<WorkHistory>,
    @InjectRepository(ExpertApp) private readonly expertAppRepo: EntityRepository<ExpertApp>,
  ) {}

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

  async getWorkHistoryByUsername(username: string): Promise<ApproveExpertDetailDTO> {
    const user = await this.userRepo.findOne({ username: username })
    const workHistory = await this.workHistoryRepo.find({ expert: user })
    if (!user) {
      throw new NotFoundException('User not found or do not have work history')
    }

    const wh = workHistory.map((wh) => wrap(wh).toJSON() as IWorkHistory)

    return {
      username: user.username,
      displayName: user.displayName,
      profilePictureURL: user.profilePictureURL,
      workHistory: wh,
    }
  }

  async approveOrRejectExpert(username: string, status: ChangeUserRole) {
    const expertApp = await this.expertAppRepo.findOne({ user: { username: username } }, ['user'])
    if (!expertApp.user) {
      throw new NotFoundException('User not found or user did not send application')
    }
    if (expertApp.user.role !== UserRole.USER) {
      throw new UnprocessableEntityException('User is already an expert')
    }
    if (status === ChangeUserRole.APPROVED) {
      expertApp.user.role = UserRole.EXPERT
      await this.userRepo.persistAndFlush(expertApp.user)
    }
    await this.expertAppRepo.removeAndFlush(expertApp)
    return
  }
}
