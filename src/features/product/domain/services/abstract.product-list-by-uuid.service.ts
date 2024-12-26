import { Product } from '@/features/product/domain/core/product';

export abstract class AbstractProductListByUuidService {
  abstract handle(uuid: string): Promise<Product>;
}
