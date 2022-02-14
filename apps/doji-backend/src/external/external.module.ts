import { Logger, Module } from '@nestjs/common'
import Redis from 'ioredis'
import { environment } from 'src/environments/environment'

@Module({
  providers: [
    {
      provide: 'Redis',
      useFactory: () => {
        const redis = new Redis({
          host: environment.redis.host,
          db: environment.redis.db,
        })
        const logger = new Logger('Redis')
        redis.on('error', (err) => logger.error(err))
      },
    },
  ],
  exports: ['Redis'],
})
export class ExternalModule {}
