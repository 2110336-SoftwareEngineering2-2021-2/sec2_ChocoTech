import { IReviewStatResponseDTO } from 'libs/api/src/lib/dtos/session'

export interface IExpertRegistrationRequestDTO {
  field: string
  desc: string
}

export interface IExpertApplicationListItemDTO {
  firstname: string
  lastname: string
  username: string
}

export interface IExpertApplicationQueryDTO {
  keyword?: string
}

export interface IExpertInfoResponseDTO {
  reviewStat: IReviewStatResponseDTO
}

export interface IApproveExpertDetailDTO {
  firstname: string
  lastname: string
  username: string
  profilePictureURL: string
}
