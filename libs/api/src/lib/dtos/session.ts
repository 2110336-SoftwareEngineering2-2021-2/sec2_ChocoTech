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
