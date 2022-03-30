import { Collection } from '@mikro-orm/core'
import { ISchedule } from 'libs/api/src/lib/entities/Schedule'

import { UserRole } from '../constants/userRole'

export interface IUser {
  username: string
  passwordHash: string
  displayName: string
  coinBalance: number
  onlineStatus: boolean
  email: string
  registerationDate: Date
  role: UserRole
  firstName?: string
  lastName?: string
  location?: string
  omiseCustomerToken?: string
  googleRefreshToken?: string
  googleEmail?: string
  profilePictureURL?: string
  schedules: Collection<ISchedule>
  friends: Collection<IUser>
}
