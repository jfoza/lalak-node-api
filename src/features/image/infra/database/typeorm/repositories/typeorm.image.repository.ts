import { AbstractImageRepository } from '@/features/image/domain/repositories/abstract.image.repository';
import { Injectable } from '@nestjs/common';
import { Image } from '@/features/image/domain/core/image';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageEntity } from '@/features/image/infra/database/typeorm/entities/image.entity';

@Injectable()
export class TypeormImageRepository implements AbstractImageRepository {
  @InjectRepository(ImageEntity)
  private readonly imageEntityRepository: Repository<ImageEntity>;

  async save(images: Image[]): Promise<Image[]> {
    const imageEntities: ImageEntity[] = images.map(
      (image: Image): ImageEntity =>
        this.imageEntityRepository.create({
          uuid: image.uuid,
          path: image.path,
          type: image.type,
          created_at: image.createdAt,
        }),
    );

    await this.imageEntityRepository.save(imageEntities);

    return images;
  }

  async remove(image: Image): Promise<void> {
    return Promise.resolve(undefined);
  }
}
