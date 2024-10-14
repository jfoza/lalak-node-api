import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from '@/mail/application/mail.service';

@Module({
  imports: [ConfigModule],
  providers: [
    MailService,
    {
      provide: 'IMailService',
      useExisting: MailService,
    },
  ],
  exports: ['IMailService'],
})
export class MailModule {}
