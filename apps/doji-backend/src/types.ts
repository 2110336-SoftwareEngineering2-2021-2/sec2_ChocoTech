import { User } from '@backend/entities/User'

export interface IUserReference {
  username: string
  getUser: () => Promise<User>
}
