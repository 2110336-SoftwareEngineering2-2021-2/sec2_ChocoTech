import { Logger, Module } from '@nestjs/common'
import Redis from 'ioredis'

import { environment } from '../environments/environment'

@Module({
  providers: [
    {
      provide: 'Redis',
      useFactory: () => {
        const redis = new Redis({
          host: environment.redis.host,
          db: environment.redis.db,
          port: environment.redis.port,
          username: environment.redis.username,
          password: environment.redis.password,
        })
        const logger = new Logger('Redis')
        redis.on('error', (err) => logger.error(err))
        return redis
      },
    },
  ],
  exports: ['Redis'],
})
export class ExternalModule {}
