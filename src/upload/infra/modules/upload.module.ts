import { Module } from '@nestjs/common';
import { StorageUploadImageRepository } from '@/upload/infra/local-storage/repositories/storage.upload-image.repository';
import { UploadImageRepository } from '@/upload/domain/repositories/upload-image.repository';
import { UploadImageUseCase } from '@/upload/application/use-cases/upload-image.use-case';
import { AbstractUploadImageUseCase } from '@/upload/domain/services/abstract.upload-image.use-case';

@Module({
  imports: [],
  providers: [
    StorageUploadImageRepository,
    {
      provide: UploadImageRepository,
      useExisting: StorageUploadImageRepository,
    },
    UploadImageUseCase,
    {
      provide: AbstractUploadImageUseCase,
      useExisting: UploadImageUseCase,
    },
  ],
  controllers: [],
  exports: [AbstractUploadImageUseCase],
})
export class UploadModule {}
