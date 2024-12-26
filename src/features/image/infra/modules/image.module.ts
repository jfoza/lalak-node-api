import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from '@/features/image/infra/database/typeorm/entities/image.entity';
import { TypeormImageRepository } from '@/features/image/infra/database/typeorm/repositories/typeorm.image.repository';
import { AbstractImageRepository } from '@/features/image/domain/repositories/abstract.image.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity])],
  controllers: [],
  providers: [
    TypeormImageRepository,
    {
      provide: AbstractImageRepository,
      useExisting: TypeormImageRepository,
    },
  ],
  exports: [AbstractImageRepository],
})
export class ImageModule {}
