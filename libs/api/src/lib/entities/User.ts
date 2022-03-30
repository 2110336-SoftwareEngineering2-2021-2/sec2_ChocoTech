import { IReview } from 'libs/api/src/lib/entities/Review'
import { ISchedule } from 'libs/api/src/lib/entities/Schedule'

import { UserRole } from '../constants/userRole'

export interface IUser {
  username: string
  email: string
  displayName: string
  coinBalance: number
  onlineStatus: boolean
  registerationDate: Date
  role: UserRole
  firstName?: string
  lastName?: string
  location?: string
  omiseCustomerToken?: string
  googleEmail?: string
  googleRefreshToken?: string
  profilePictureURL?: string
  schedules: ISchedule[]
  reviews: IReview[]
}
