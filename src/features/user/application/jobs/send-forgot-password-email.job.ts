import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Inject } from '@nestjs/common';
import { IMailService } from '@/mail/domain/interfaces/mail.service.interface';
import { Helper } from 'src/common/infra/helpers';
import { IMailContact } from '@/mail/domain/interfaces/mail-contact.interface';

@Processor('email')
export class SendForgotPasswordEmailJob {
  constructor(
    @Inject('IMailService') private readonly mailService: IMailService,
  ) {}

  @Process('sendForgotPasswordEmail')
  async dispatch(job: Job) {
    const { email, name, token } = job.data;

    const template = Helper.getMailTemplatePath('forgot-password.hbs');

    await this.mailService.send({
      to: {
        name: name,
        address: email,
      } as IMailContact,
      subject: '[Lalak Doceria] Redefinição de senha',
      templateData: {
        template,
        variables: {
          name: name,
          link: `https://lalakdoceria.com.br/redefinir-senha?token=${token}`,
        },
      },
    });
  }
}
