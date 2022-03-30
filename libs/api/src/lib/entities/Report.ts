import { IUser } from 'libs/api/src/lib/entities/User'

export interface IReport {
  reporter: IUser
  expert: IUser
  createAt: Date
}
