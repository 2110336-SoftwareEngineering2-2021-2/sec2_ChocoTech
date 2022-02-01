import { Module } from '@nestjs/common'
import {MikroOrmModule} from '@mikro-orm/nestjs'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { environment } from 'src/environments/environment'
import { AuthModule } from 'src/auth/auth.module'

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

console.log("CD: ", __dirname)