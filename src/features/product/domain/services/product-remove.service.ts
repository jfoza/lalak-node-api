import { Product } from '@/features/product/domain/entities/product';

export interface IProductRemoveService {
  handle(uuid: string): Promise<Product>;
}

export const IProductRemoveService = Symbol('IProductRemoveService');
