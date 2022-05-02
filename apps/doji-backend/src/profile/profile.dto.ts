import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

import {
  IProfileResponseDTO,
  IReviewStatResponseDTO,
  ISession,
  IUserEditProfileRequestDTO,
  IWorkHistory,
} from '@libs/api'

export class UserEditProfileRequestDTO implements IUserEditProfileRequestDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  displayName?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  firstName?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  location?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  profilePictureURL?: string
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
