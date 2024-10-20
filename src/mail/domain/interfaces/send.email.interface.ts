import { IMailContact } from '@/mail/domain/interfaces/mail-contact.interface';
import { IParseMailTemplate } from '@/mail/domain/interfaces/parse-mail-template.interface';

export interface ISendMail {
  from?: IMailContact;
  to: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}
