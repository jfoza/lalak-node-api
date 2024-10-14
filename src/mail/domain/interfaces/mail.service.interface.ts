import { ISendMail } from '@/mail/domain/interfaces/send.email.interface';

export interface IMailService {
  send({ from, to, subject, templateData }: ISendMail): Promise<void>;
}
