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
