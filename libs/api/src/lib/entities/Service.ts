import { IUser } from '@libs/api'

export interface IService {
  expert: IUser
  name: string
  fee: number
  description: string
}
