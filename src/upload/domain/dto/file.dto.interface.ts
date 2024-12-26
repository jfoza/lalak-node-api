import { Readable } from 'stream';
import { FileTypeEnum } from '@/utils/enums/file-type.enum';

export abstract class AbstractFileDto {
  fieldname?: string;
  originalname?: string;
  encoding?: string;
  mimetype?: string;
  size?: number;
  stream?: Readable;
  destination?: string;
  filename?: string;
  path?: string;
  buffer?: Buffer;
  type?: FileTypeEnum;
}
