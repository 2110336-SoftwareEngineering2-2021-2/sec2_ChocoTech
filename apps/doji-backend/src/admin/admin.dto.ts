import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsString } from 'class-validator'

import { IAdminCreationRequestDTO, IApproveExpertDetailDTO, IWorkHistory } from '@libs/api'
import { IChangeUserRoleDTO } from '@libs/api'

export enum ChangeUserRole {
  APPROVED = 'approved',
  REJECTED = 'rejected',
}
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
  displayName: string

  @ApiProperty()
  @IsString()
  profilePictureURL: string

  @ApiProperty()
  workHistory: IWorkHistory[]
}

export class ChangeUserRoleDTO implements IChangeUserRoleDTO {
  @ApiProperty()
  @IsEnum(ChangeUserRole)
  status: ChangeUserRole
}
