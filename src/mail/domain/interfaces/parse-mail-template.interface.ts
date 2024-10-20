import { ITemplateVariable } from '@/mail/domain/interfaces/template-variable.interface';

export interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariable;
}
