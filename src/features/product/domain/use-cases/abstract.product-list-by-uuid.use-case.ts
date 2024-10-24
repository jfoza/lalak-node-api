import { Product } from '@/features/product/domain/core/product';

export abstract class AbstractProductListByUuidUseCase {
  abstract execute(uuid: string): Promise<Product>;
}
