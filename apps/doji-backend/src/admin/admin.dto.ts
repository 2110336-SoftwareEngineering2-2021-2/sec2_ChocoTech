import { WorkHistory } from '@backend/entities/WorkHistory'
import { IAdminCreationRequestDTO, IExpertApplicationListItemDTO } from '@libs/api'
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

export class ApproveExpertDetailDTO implements IExpertApplicationListItemDTO {
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
  workHistory: WorkHistory
}
