import { Storage } from '@google-cloud/storage'
import { Injectable } from '@nestjs/common'
import { unlink } from 'fs'
import { writeFile } from 'fs/promises'
import { google } from 'googleapis'
import { promisify } from 'util'

import { environment } from '@backend/environments/environment'

@Injectable()
export class ImageService {
  private storage: Storage
  constructor() {
    writeFile('google.json', Buffer.from(environment.google.key, 'base64')).then(() => {
      this.storage = new Storage({ keyFilename: 'google.json' })
    })
  }

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
