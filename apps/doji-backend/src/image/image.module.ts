import { Module } from '@nestjs/common'

import { ImageController } from './image.controller'
import { ImageService } from './image.service'

@Module({
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
