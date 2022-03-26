import { SessionHistoryCardProps } from '@frontend/components/Card/SessionHistoryCard'
import { mockServiceData } from '@frontend/mock-data/services'
import { mockUserData } from '@frontend/mock-data/users'
import { SessionStatus } from '@libs/api'

export const mockSessionHistoryData: SessionHistoryCardProps[] = [
  {
    id: 0,
    meetingProviderId: '0',
    fee: 20,
    coinOnHold: 500,
    status: SessionStatus.ACCEPTED,
    topic: 'Topic',
    duration: 0,
    startTime: new Date(),
    sourceId: '0',
    creator: mockUserData[0],
    service: mockServiceData[0],
  },
  {
    id: 0,
    meetingProviderId: '0',
    fee: 20,
    coinOnHold: 500,
    status: SessionStatus.CANCELED,
    topic: 'Topic',
    duration: 0,
    startTime: new Date(),
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
    startTime: new Date(),
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
    startTime: new Date(),
    sourceId: '0',
    creator: mockUserData[0],
    service: mockServiceData[0],
  },
]
