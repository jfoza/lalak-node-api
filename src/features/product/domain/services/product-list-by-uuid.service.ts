import { Product } from '@/features/product/domain/entities/product';

export interface IProductListByUuidService {
  handle(uuid: string): Promise<Product>;
}

export const IProductListByUuidService = Symbol('IProductListByUuidService');
