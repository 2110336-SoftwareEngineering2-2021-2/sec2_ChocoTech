import { IUser } from '@libs/api'

export interface IWorkHistory {
  id: string
  expert: IUser
  topic: string
  description: string
}
