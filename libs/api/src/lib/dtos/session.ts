import { ScheduleStatus } from 'libs/api/src/lib/constants/sessionStatus'
import { ISession } from 'libs/api/src/lib/entities/Session'

export interface ICreateSessionRequestDTO {
  topic: string
  description: string
  fee: number
}

export interface IScheduleSessionDTO {
  sessionId: string
  duration: number
  startTime: Date
  coinOnHold: number
  participantsUsername: string[]
}

export interface IReviewStatResponseDTO {
  '1': number
  '2': number
  '3': number
  '4': number
  '5': number
  avg: number
  count: number
}

export interface IPublicSessionReviewResponseDTO {
  id: string
  rating: number
  authorName: string
  content: string
  createdAt: Date
}

export interface ISessionResponseDTO extends ISession {
  reviewStat: IReviewStatResponseDTO
}

export interface IChangeScheduleStatusRequestDTO {
  status: ScheduleStatus
}
