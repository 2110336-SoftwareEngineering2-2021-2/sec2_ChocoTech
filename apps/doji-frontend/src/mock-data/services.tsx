import { mockUserData } from '@frontend/mock-data/users'
import { IService } from '@libs/api'

export const mockServiceData: IService[] = [
  {
    expert: mockUserData[0],
    name: 'x',
    fee: 500,
    description: 'desc',
  },
]
