import { IReview, IUser } from '@libs/api'
import { ScheduleStatus } from 'libs/api/src/lib/constants/sessionStatus'
import { IMeResponseDTO } from 'libs/api/src/lib/dtos/auth'
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

export interface ISessionResponseDTO {
  id: string
  fee: number
  owner: IMeResponseDTO
  topic: string
  description: string
  reviews: IReview[]
}

export interface ISessionStatResponseDTO {
  id: string
  fee: number
  owner: IUser
  topic: string
  description: string
  reviews: IReview[]
  reviewStat: IReviewStatResponseDTO
}

export interface IChangeScheduleStatusRequestDTO {
  status: ScheduleStatus
}

export interface IScheudleResponseDTO {
  id: string
  session: ISession
  creator: IUser
  coinOnHold: number
  status: ScheduleStatus
  duration: number
  startTime: Date
  meetId?: string
  meetUrl?: string
  participants?: IUser[]
}
