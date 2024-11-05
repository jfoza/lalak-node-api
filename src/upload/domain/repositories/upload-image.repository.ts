import { File } from '@/upload/domain/core/file';

export abstract class UploadImageRepository {
  abstract save(file: File): Promise<File>;
  abstract remove(file: File, directory: string): Promise<void>;
}
