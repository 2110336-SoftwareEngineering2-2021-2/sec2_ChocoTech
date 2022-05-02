import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes } from '@nestjs/swagger'
import { diskStorage } from 'multer'

import { ImageService } from '@backend/image/image.service'

@Controller('image')
export class ImageController {
  constructor(private readonly service: ImageService) {}
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: 'imgs' }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.service.uploadFile(file)
  }
}
