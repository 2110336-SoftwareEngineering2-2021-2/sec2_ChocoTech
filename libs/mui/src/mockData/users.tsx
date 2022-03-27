import { IUser, UserRole } from '@libs/api'

export const mockUserData: IUser[] = [
  {
    username: 'John',
    passwordHash: '',
    displayName: 'John Doe',
    coinBalance: 450,
    onlineStatus: true,
    email: 'John.D@gmail.com',
    registerationDate: new Date(),
    role: UserRole.USER,
    firstName: 'John',
    lastName: 'Doe',
    location: 'Bangkok',
    googleEmail: 'John.D@gmail.com',
    profilePictureURL: 'https://mui.com/static/images/avatar/3.jpg',
    sessions: [] as any,
  },
]
