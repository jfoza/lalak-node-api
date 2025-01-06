import { Image } from '@/features/image/domain/entities/image';

export interface IImageRepository {
  save(images: Image[]): Promise<Image[]>;
  remove(image: Image): Promise<void>;
}

export const IImageRepository = Symbol('IImageRepository');
