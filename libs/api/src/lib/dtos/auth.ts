import { IUser } from '../entities/User'

export interface IMeResponseDTO extends Omit<IUser, 'passwordHash'> {}

export interface ISendResetPasswordEmailBody {
  email: string
}

export interface IResetPasswordBody {
  newPassword: string
}

export interface IUserReference<T extends IUser = IUser> {
  username: string
  getUser: <K extends T = T>() => Promise<K>
}

export interface IGoogleUser {
  email: string
  firstName: string
  lastName: string
  picture: string
  accessToken: string
}

export interface IJwtPayload {
  username: string
  accessToken: string
  googleAccessToken: string
}
