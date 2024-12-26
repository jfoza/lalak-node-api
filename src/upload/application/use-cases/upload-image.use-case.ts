import { File, FileProps } from '@/upload/domain/entities/file';
import { AbstractUploadImageUseCase } from '@/upload/domain/use-cases/abstract.upload-image.use-case';
import { Inject, Injectable } from '@nestjs/common';
import { UploadImageRepository } from '@/upload/domain/repositories/upload-image.repository';
import path from 'path';
import { uploadConfig } from '@/upload/application/config/upload.config';
import { AbstractFileDto } from '@/upload/domain/dto/file.dto.interface';

@Injectable()
export class UploadImageUseCase implements AbstractUploadImageUseCase {
  constructor(
    @Inject(UploadImageRepository)
    private readonly storageImageRepository: UploadImageRepository,
  ) {}

  async execute(fileDto: AbstractFileDto, directory: string): Promise<File> {
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
