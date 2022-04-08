import { IReviewStatResponseDTO } from 'libs/api/src/lib/dtos/session'
import { IWorkHistory } from 'libs/api/src/lib/entities/WorkHistory'

export interface IExpertRegistrationRequestDTO {
  field: string
  desc: string
}

export interface IExpertApplicationListItemDTO {
  displayName: string
  username: string
  imageURL: string
}

export interface IExpertApplicationQueryDTO {
  keyword?: string
}

export interface IExpertInfoResponseDTO {
  reviewStat: IReviewStatResponseDTO
}

export interface IApproveExpertDetailDTO {
  displayName: string
  username: string
  profilePictureURL: string
  workHistory: IWorkHistory[]
}

export interface IChangeUserRoleDTO {
  status: 'approved' | 'rejected'
}
