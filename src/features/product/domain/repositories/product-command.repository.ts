import { Product } from '@/features/product/domain/core/product';

export abstract class ProductCommandRepository {
  abstract create(product: Product): Promise<Product>;
  abstract update(product: Product): Promise<Product>;
  abstract saveCategories(product: Product): Promise<void>;
  abstract saveEvents(product: Product): Promise<void>;
  abstract saveImages(product: Product): Promise<void>;
  abstract remove(uuid: string): Promise<void>;
}
