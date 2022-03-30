import { UserRole } from '@libs/api'
import { ISchedule } from 'libs/api/src/lib/entities/Schedule'

export enum CookieKey {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  GOOGLE_ACCESS_TOKEN = 'GOOGLE_ACCESS_TOKEN',
}

export interface IUserResponseDTO {
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
  schedules?: ISchedule[]
}

export interface IMeResponseDTO extends Omit<IUserResponseDTO, 'passwordHash'> {}

export interface IUserSendResetPasswordEmailRequest {
  email: string
}

export interface IUserResetPasswordRequest {
  newPassword: string
}

export interface IUserChangePasswordRequestDTO {
  currentPassword: string
  newPassword: string
}

export interface IUserEditProfileRequestDTO {
  displayName: string
  firstName: string
  lastName: string
  location: string
}

export interface IUserRegistrationRequestDTO {
  username: string
  displayName: string
  email: string
  password: string
}

export interface IAdminCreationRequestDTO {
  username: string
  password: string
}

export interface IUserLoginRequestDTO {
  username: string
  password: string
}
