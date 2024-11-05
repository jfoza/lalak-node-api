import { FileDto } from '@/upload/application/dto/file.dto';
import { File } from '@/upload/domain/core/file';

export abstract class AbstractUploadImageUseCase {
  abstract handle(fileDto: FileDto, directory: string): Promise<File>;
}
