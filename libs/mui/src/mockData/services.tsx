import { IService } from '@libs/api'

import { mockUserData } from './users'

export const mockServiceData: IService[] = [
  {
    expert: mockUserData[0],
    name: 'x',
    fee: 500,
    description: 'desc',
  },
]
