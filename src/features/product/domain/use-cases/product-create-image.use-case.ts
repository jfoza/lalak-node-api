import { Product } from '@/features/product/domain/entities/product';
import { File } from '@/upload/domain/entities/file';
import { Image } from '@/features/image/domain/entities/image';

export interface IProductCreateImageUseCase {
  execute(product: Product, files: File[]): Promise<Image[]>;
}

export const IProductCreateImageUseCase = Symbol('IProductCreateImageUseCase');
