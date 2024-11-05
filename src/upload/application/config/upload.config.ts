import path from 'path';
import crypto from 'crypto';
import { Helper } from '@/common/infra/helpers';

const uploadFolder: string = path.resolve(process.cwd(), 'storage');

export const uploadConfig = {
  directory: uploadFolder,
  storage: (originalname: string): string => {
    const fileHash: string = crypto.randomBytes(10).toString('hex');
    return `${fileHash}-${Helper.stringUniqueName(originalname)}`;
  },
};
