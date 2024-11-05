import { UploadImageRepository } from '@/upload/domain/repositories/upload-image.repository';
import path from 'path';
import { File } from '@/upload/domain/core/file';
import { writeFile, mkdir } from 'node:fs/promises';
import fs from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageUploadImageRepository implements UploadImageRepository {
  async save(file: File): Promise<File> {
    await mkdir(file.path, { recursive: true });
    const filePath: string = path.join(file.path, file.filename);
    await writeFile(filePath, file.buffer);

    return file;
  }

  async remove(file: File, storagePath: string): Promise<void> {
    const filePath = path.join(storagePath, file.filename);
    await fs.promises.unlink(filePath);
  }
}
