import { Image } from '@/features/image/domain/core/image';

export abstract class AbstractImageRepository {
  abstract save(images: Image[]): Promise<Image[]>;
  abstract remove(image: Image): Promise<void>;
}
