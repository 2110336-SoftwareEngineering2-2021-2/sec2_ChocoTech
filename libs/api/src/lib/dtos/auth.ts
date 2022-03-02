import { IUser } from '../entities/User'

export interface ILoginResponseDTO {
  token: string
  user: IMeResponseDTO
}

export interface IMeResponseDTO extends Omit<IUser, 'passwordHash'> {}
