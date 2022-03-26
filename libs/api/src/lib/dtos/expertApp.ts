import { IReviewStat } from 'libs/api/src/lib/dtos/session'

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

export interface IExpertInfoDTO {
  reviewStat: IReviewStat
}
