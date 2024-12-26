import { Product } from '@/features/product/domain/core/product';
import { File } from '@/upload/domain/entities/file';
import { Image } from '@/features/image/domain/core/image';

export abstract class AbstractProductCreateImageUseCase {
  abstract execute(product: Product, files: File[]): Promise<Image[]>;
}
