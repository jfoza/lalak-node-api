import { File, FileProps } from '@/upload/domain/core/file';
import { AbstractUploadImageUseCase } from '@/upload/domain/services/abstract.upload-image.use-case';
import { FileDto } from '@/upload/application/dto/file.dto';
import { Inject, Injectable } from '@nestjs/common';
import { UploadImageRepository } from '@/upload/domain/repositories/upload-image.repository';
import path from 'path';
import { uploadConfig } from '@/upload/application/config/upload.config';

@Injectable()
export class UploadImageUseCase implements AbstractUploadImageUseCase {
  constructor(
    @Inject(UploadImageRepository)
    private readonly storageImageRepository: UploadImageRepository,
  ) {}

  async handle(fileDto: FileDto, directory: string): Promise<File> {
    const filename: string = uploadConfig.storage(fileDto.originalname);

    const file: File = await File.create({
      fieldname: fileDto.fieldname,
      originalname: fileDto.originalname,
      encoding: fileDto.encoding,
      mimetype: fileDto.mimetype,
      size: fileDto.size,
      stream: fileDto.stream,
      destination: fileDto.destination,
      filename,
      path: path.join(uploadConfig.directory, directory),
      buffer: fileDto.buffer,
    } as FileProps);

    return await this.storageImageRepository.save(file);
  }
}
