import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from '@/features/image/infra/database/typeorm/entities/image.entity';
import { TypeormImageRepository } from '@/features/image/infra/database/typeorm/repositories/typeorm.image.repository';
import { IImageRepository } from '@/features/image/domain/repositories/image.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity])],
  controllers: [],
  providers: [
    TypeormImageRepository,
    {
      provide: IImageRepository,
      useExisting: TypeormImageRepository,
    },
  ],
  exports: [IImageRepository],
})
export class ImageModule {}
