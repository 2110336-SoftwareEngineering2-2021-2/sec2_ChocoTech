import { WorkHistory } from '@backend/entities/WorkHistory'
import { IAdminCreationRequestDTO, IApproveExpertDetailDTO } from '@libs/api'
import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class AdminCreationRequestDTO implements IAdminCreationRequestDTO {
  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsString()
  password: string
}

export class ApproveExpertDetailDTO implements IApproveExpertDetailDTO {
  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsString()
  firstname: string

  @ApiProperty()
  @IsString()
  lastname: string

  @ApiProperty()
  @IsString()
  profilePictureURL: string

  @ApiProperty()
  workHistory: WorkHistory[]
}
