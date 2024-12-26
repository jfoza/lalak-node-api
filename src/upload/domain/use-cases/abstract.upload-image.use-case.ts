import { FileDto } from '@/upload/application/dto/file.dto';
import { File } from '@/upload/domain/entities/file';

export abstract class AbstractUploadImageUseCase {
  abstract execute(fileDto: FileDto, directory: string): Promise<File>;
}
