import { IReportDTO } from '@libs/api'
import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class ReportDTO implements IReportDTO {
  @ApiProperty()
  @IsString()
  expertUsername: string
}
