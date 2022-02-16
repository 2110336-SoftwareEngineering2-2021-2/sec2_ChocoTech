import { environment } from '@backend/environments/environment'
import { Logger, Module } from '@nestjs/common'
import Redis from 'ioredis'

export function newRedisClient() {
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
