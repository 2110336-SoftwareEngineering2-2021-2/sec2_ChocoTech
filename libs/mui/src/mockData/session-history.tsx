import { ISchedule, ScheduleStatus } from '@libs/api'

import { mockServiceData } from './services'
import { mockUserData } from './users'

export const mockSessionHistoryData: ISchedule[] = [
  {
    id: 0,
    meetingProviderId: '0',
    fee: 20,
    coinOnHold: 500,
    status: SessionStatus.ACCEPTED,
    topic: 'Topic',
    duration: 0,
    startTime: new Date('2020-1-1'),
    sourceId: '0',
    creator: mockUserData[0],
    service: mockServiceData[0],
  },
  {
    id: 0,
    meetingProviderId: '0',
    fee: 40,
    coinOnHold: 500,
    status: SessionStatus.CANCELED,
    topic: 'Topic',
    duration: 0,
    startTime: new Date('2022-3-28'),
    sourceId: '0',
    creator: mockUserData[0],
    service: mockServiceData[0],
  },
  {
    id: 0,
    meetingProviderId: '0',
    fee: 20,
    coinOnHold: 500,
    status: SessionStatus.ENDED,
    topic: 'Topic',
    duration: 0,
    startTime: new Date('2022-3-27'),
    sourceId: '0',
    creator: mockUserData[0],
    service: mockServiceData[0],
  },
  {
    id: 0,
    meetingProviderId: '0',
    fee: 20,
    coinOnHold: 500,
    status: SessionStatus.PENDING,
    topic: 'Topic',
    duration: 0,
    startTime: new Date('2022-3-26'),
    sourceId: '0',
    creator: mockUserData[0],
    service: mockServiceData[0],
  },
]
