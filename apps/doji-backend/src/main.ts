/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { INestApplication, Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app/app.module'

// eslint-disable-next-line
const cookieParser = require('cookie-parser')

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'https://dev.choco.saenyakorn.dev',
      'https://choco.saenyakorn.dev',
    ],
  })
  app.use(cookieParser())
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  const port = process.env.PORT_NEST || 3333
  setupSwagger(app)
  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Doji Backend API')
    .setVersion('0.0.1')
    .addBearerAuth({ type: 'http' })
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/swagger', app, document)
}

bootstrap()
