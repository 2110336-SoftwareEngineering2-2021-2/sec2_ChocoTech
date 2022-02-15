import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Module } from '@nestjs/common'
import { join } from 'path/posix'

import { MailService } from './mail.service'

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.doji.com',
        secure: false,
        auth: {
          user: 'testuser@doji.com',
          pass: 'pass',
        },
      },
      defaults: {
        from: '"No Reply"<noreply@doji.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
