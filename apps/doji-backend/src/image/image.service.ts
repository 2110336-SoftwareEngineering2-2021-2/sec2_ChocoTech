import { Storage } from '@google-cloud/storage'
import { Injectable } from '@nestjs/common'
import { Express } from 'express'
import { Multer } from 'multer'

@Injectable()
export class ImageService {
  storage = new Storage()
  async uploadFile(file: Express.Multer.File) {
    const bucket = this.storage.bucket('doji-profile-pic')
    const res = await bucket.upload(file.path, {
      destination: file.filename,
      contentType: file.mimetype,
    })
    return { publicUrl: res[0].publicUrl() }
  }
}
