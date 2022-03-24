import { AdminModule } from '@backend/admin/admin.module'
import { AuthModule } from '@backend/auth/auth.module'
import { environment } from '@backend/environments/environment'
import { ExpertAppModule } from '@backend/expert/expert.module'
import { MessagingModule } from '@backend/messaging/messaging.module'
import { PaymentModule } from '@backend/payment/payment.module'
import { ProfileModule } from '@backend/profile/profile.module'
import { RegisterModule } from '@backend/register/register.module'
import { ReviewModule } from '@backend/review/review.module'
import { SessionModule } from '@backend/session/session.module'
import { WorkHistoryModule } from '@backend/work-history/work-history.module'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_PIPE } from '@nestjs/core'

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
      port: parseInt(environment.database.port),
      forceUtcTimezone: true,
      validate: true,
      strict: true,
    }),
    AuthModule,
    AdminModule,
    RegisterModule,
    ProfileModule,
    MessagingModule,
    PaymentModule,
    WorkHistoryModule,
    SessionModule,
    ExpertAppModule,
    ReviewModule,
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
