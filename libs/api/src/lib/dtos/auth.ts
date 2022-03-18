import { IUser } from '../entities/User'

export interface ILoginResponseDTO {
  token: string
  user: IMeResponseDTO
}

export interface IMeResponseDTO extends Omit<IUser, 'passwordHash'> {}

export interface IRequestResetPasswordBody {
  email: string
}

export interface IUserReference<T extends IUser = IUser> {
  username: string
  getUser: <K extends T = T>() => Promise<K>
}
