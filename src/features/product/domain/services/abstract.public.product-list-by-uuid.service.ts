import { Product } from '@/features/product/domain/core/product';

export abstract class AbstractPublicProductListByUuidService {
  abstract handle(uuid: string): Promise<Product>;
}
