import nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IMailService } from '@/mail/domain/interfaces/mail.service.interface';
import { ISendMail } from '@/mail/domain/interfaces/send.email.interface';
import { HandlebarsMailTemplateService } from '@/mail/application/handlebars-mail-template.service';

@Injectable()
export class MailService implements IMailService {
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    const mailAuth =
      this.configService.get<string>('MAIL_USERNAME') &&
      this.configService.get<string>('MAIL_PASSWORD')
        ? {
            user: this.configService.get<string>('MAIL_USERNAME'),
            pass: this.configService.get<string>('MAIL_PASSWORD'),
          }
        : null;

    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: mailAuth || undefined,
    });
  }

  async send({ from, to, subject, templateData }: ISendMail): Promise<void> {
    await this.transporter.sendMail({
      from: {
        name: from?.name || this.configService.get<string>('MAIL_FROM_NAME'),
        address:
          from?.address || this.configService.get<string>('MAIL_FROM_ADDRESS'),
      },
      to: {
        name: to.name,
        address: to.address,
      },
      subject,
      html: await HandlebarsMailTemplateService.parse(templateData),
    });
  }
}
