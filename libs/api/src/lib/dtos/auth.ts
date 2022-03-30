import { IUser } from 'libs/api/src/lib/entities/User'

export enum CookieKey {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  GOOGLE_ACCESS_TOKEN = 'GOOGLE_ACCESS_TOKEN',
}

export interface IMeResponseDTO extends Omit<IUser, 'passwordHash'> {}

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
