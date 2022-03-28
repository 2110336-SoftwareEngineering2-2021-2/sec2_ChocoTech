export interface IScheduleSessionDTO {
  fee: number
  expertUsername: string
  serviceName: string
  duration: number
  startTime: Date
  participantsUsername: string[]
}

export interface IGetServiceByNameAndExpertUsernameDTO {
  expertUsername: string
  serviceName: string
}

export interface IServiceInformationDTO {
  firstname: string
  lastname: string
  title: string
  description: string
  fee: number
}

export interface ISessionInformationResponseDTO {
  id: number
  reviews: IPublicSessionReviewResponseDTO[]
  reviewStat: IReviewStatResponseDTO
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
