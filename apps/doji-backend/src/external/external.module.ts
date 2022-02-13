import { Logger, Module } from '@nestjs/common'
import Redis from 'ioredis'
import { environment } from 'src/environments/environment'

export function newRedisClient() {
  const redis = new Redis({
    host: environment.redis.host,
    db: environment.redis.db,
  })
  const logger = new Logger('Redis')
  redis.on('error', (err) => logger.error(err))
  return redis
}

@Module({
  providers: [
    {
      provide: 'Redis',
      useFactory: newRedisClient,
    },
    {
      provide: 'RedisSubscriber',
      useFactory: newRedisClient,
    },
  ],
  exports: ['Redis', 'RedisSubscriber'],
})
export class ExternalModule {}
