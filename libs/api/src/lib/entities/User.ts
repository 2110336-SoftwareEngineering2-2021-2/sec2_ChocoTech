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
}
