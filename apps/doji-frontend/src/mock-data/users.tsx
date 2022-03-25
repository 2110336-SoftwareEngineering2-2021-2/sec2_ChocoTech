import { IUser, UserRole } from '@libs/api'
import { Collection } from '@mikro-orm/core'

export const mockUserData: IUser[] = [
  {
    username: 'John',
    passwordHash: 'x',
    displayName: 'John Doe',
    coinBalance: 500,
    onlineStatus: true,
    email: 'John.D@gmail.com',
    registerationDate: new Date(),
    role: UserRole.USER,
    firstName: 'John',
    lastName: 'Doe',
    location: 'Bangkok',
    omiseCustomerToken: 'x',
    googleRefreshToken: 'x',
    googleEmail: 'John.D@gmail.com',
    profilePictureURL: '',
    sessions: [] as any,
  },
]
