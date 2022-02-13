import { Module } from '@nestjs/common'
import Redis from 'ioredis'

import { environment } from '../environments/environment'

@Module({
  providers: [
    {
      provide: 'Redis',
      useValue: new Redis({
        host: environment.redis.host,
        db: environment.redis.db,
        port: environment.redis.port,
        username: environment.redis.username,
        password: environment.redis.password,
      }),
    },
  ],
  exports: ['Redis'],
})
export class ExternalModule {}
