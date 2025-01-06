import { Product } from '@/features/product/domain/entities/product';

export interface ProductCommandRepository {
  create(product: Product): Promise<Product>;
  update(product: Product): Promise<Product>;
  // saveCategories(product: Product): Promise<void>;
  // saveEvents(product: Product): Promise<void>;
  // saveImages(product: Product): Promise<void>;
  remove(uuid: string): Promise<void>;
}

export const ProductCommandRepository = Symbol('ProductCommandRepository');
