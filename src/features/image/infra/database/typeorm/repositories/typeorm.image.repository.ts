import { AbstractImageRepository } from '@/features/image/domain/repositories/abstract.image.repository';
import { Injectable } from '@nestjs/common';
import { Image } from '@/features/image/domain/core/image';

@Injectable()
export class TypeormImageRepository implements AbstractImageRepository {
  save(image: Image): Promise<Image> {
    return Promise.resolve(undefined);
  }

  remove(image: Image): Promise<void> {
    return Promise.resolve(undefined);
  }
}
