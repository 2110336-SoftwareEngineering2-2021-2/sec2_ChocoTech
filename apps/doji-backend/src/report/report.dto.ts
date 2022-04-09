import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

import { IReportDTO } from '@libs/api'

export class ReportDTO implements IReportDTO {
  @ApiProperty()
  @IsString()
  expertUsername: string
}
