import { IReviewStatResponseDTO } from 'libs/api/src/lib/dtos/session'
import { ISession } from 'libs/api/src/lib/entities/Session'
import { IWorkHistory } from 'libs/api/src/lib/entities/WorkHistory'

export interface IProfileResponseDTO {
  username: string
  displayName: string
  role: string
  profilePictureURL: string
  workHistory: IWorkHistory[]
  rating: IReviewStatResponseDTO
  sessions: ISession[]
}
