import { AdminCreationRequestDTO, ApproveExpertDetailDTO } from '@backend/admin/admin.dto'
import { Admin } from '@backend/entities/Admin'
import { ExpertApp } from '@backend/entities/ExpertApp'
import { User, UserRole } from '@backend/entities/User'
import { WorkHistory } from '@backend/entities/WorkHistory'
import { EntityRepository, UniqueConstraintViolationException } from '@mikro-orm/core'
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
    const detail = new ApproveExpertDetailDTO()
    detail.username = user.username
    detail.firstname = user.firstName
    detail.lastname = user.lastName
    detail.profilePictureURL = user.profilePictureURL
    detail.workHistory = workHistory
    return detail
  }

  async approveExpert(username: string) {
    const user = await this.userRepo.findOne({ username: username })
    const expertApp = await this.expertAppRepo.findOne({ user: user })
    if (!user || !expertApp) {
      throw new NotFoundException('User not found or user did not send application')
    }
    if (user.role == UserRole.USER) {
      user.role = UserRole.EXPERT
      await this.userRepo.persistAndFlush(user)
    } else {
      throw new UnprocessableEntityException('User is already an expert')
    }
    await this.expertAppRepo.removeAndFlush(expertApp)
    return
  }

  async rejectExpert(username: string) {
    const user = await this.userRepo.findOne({ username: username })
    const expertApp = await this.expertAppRepo.findOne({ user: user })
    if (!user || !expertApp) {
      throw new NotFoundException('User not found or user did not send application')
    }
    await this.expertAppRepo.removeAndFlush(expertApp)
    return
  }
}
