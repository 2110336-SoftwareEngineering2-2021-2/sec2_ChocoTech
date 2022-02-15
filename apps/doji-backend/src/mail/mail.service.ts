import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { User } from 'src/entities/User'

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendPasswordReset(user: User, token: String) {
    const url = 'path-to-reset-page?token=${token}'

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Reset password for your Doji account',
      template: './passwordreset',
      context: {
        name: user.username,
        url,
      },
    })
  }
}
