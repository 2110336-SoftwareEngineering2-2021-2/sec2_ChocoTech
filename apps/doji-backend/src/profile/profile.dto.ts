import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

import {
  IProfileResponseDTO,
  IReviewStatResponseDTO,
  ISession,
  IUserEditProfileRequestDTO,
  IWorkHistory,
} from '@libs/api'

export class UserEditProfileRequest implements IUserEditProfileRequestDTO {
  @ApiProperty()
  @IsString()
  displayName: string

  @ApiProperty()
  @IsString()
  firstName: string

  @ApiProperty()
  @IsString()
  lastName: string

  @ApiProperty()
  @IsString()
  location: string
}
export class ProfileResponseDTO implements IProfileResponseDTO {
  @ApiProperty()
  username: string

  @ApiProperty()
  displayName: string

  @ApiProperty()
  role: string

  @ApiProperty()
  profilePictureURL: string

  @ApiProperty()
  workHistory: IWorkHistory[]

  @ApiProperty()
  rating: IReviewStatResponseDTO

  @ApiProperty()
  sessions: ISession[]
}
