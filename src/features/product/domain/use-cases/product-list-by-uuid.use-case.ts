import { Product } from '@/features/product/domain/entities/product';

export interface IProductListByUuidUseCase {
  execute(uuid: string): Promise<Product>;
}

export const IProductListByUuidUseCase = Symbol('IProductListByUuidUseCase');
