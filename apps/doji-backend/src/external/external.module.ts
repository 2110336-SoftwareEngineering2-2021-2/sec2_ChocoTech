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
      }),
    },
  ],
  exports: ['Redis'],
})
export class ExternalModule {}
