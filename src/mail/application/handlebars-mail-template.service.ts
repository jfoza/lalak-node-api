import { IParseMailTemplate } from '@/mail/domain/interfaces/parse-mail-template.interface';
import handlebars from 'handlebars';
import fs from 'fs';

export class HandlebarsMailTemplateService {
  static async parse({
    template,
    variables,
  }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(template, {
      encoding: 'utf8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}
