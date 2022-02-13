import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_PIPE } from '@nestjs/core'

import { AuthModule } from '../auth/auth.module'
import { environment } from '../environments/environment'
import { RegisterModule } from '../register/register.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
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
    RegisterModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          enableDebugMessages: true,
          forbidNonWhitelisted: true,
          whitelist: true,
          transform: true,
        }),
    },
  ],
})
export class AppModule {}
