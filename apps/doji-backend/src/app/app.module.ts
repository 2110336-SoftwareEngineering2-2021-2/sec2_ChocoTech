import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { environment } from 'src/environments/environment'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    MikroOrmModule.forRoot({
      autoLoadEntities: true,
      type: 'postgresql',
      user: environment.database.user,
      password: environment.database.password,
      dbName: environment.database.dbName,
      host: environment.database.host,
      forceUtcTimezone: true,
      validate: true,
      strict: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
