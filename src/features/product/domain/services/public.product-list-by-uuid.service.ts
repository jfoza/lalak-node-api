import { Product } from '@/features/product/domain/entities/product';

export interface IPublicProductListByUuidService {
  handle(uuid: string): Promise<Product>;
}

export const IPublicProductListByUuidService = Symbol(
  'IPublicProductListByUuidService',
);
