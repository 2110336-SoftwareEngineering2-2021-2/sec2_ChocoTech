import { Storage } from '@google-cloud/storage'
import { Injectable } from '@nestjs/common'
import { unlink } from 'fs'
import { promisify } from 'util'

@Injectable()
export class ImageService {
  storage = new Storage()
  async uploadFile(file: Express.Multer.File) {
    const bucket = this.storage.bucket('doji-profile-pic')
    const res = await bucket.upload(file.path, {
      destination: file.filename,
      contentType: file.mimetype,
    })
    await promisify(unlink)(file.path)
    return { id: `${new Date().toUTCString()}${Math.random()}`, url: res[0].publicUrl() }
  }
}
