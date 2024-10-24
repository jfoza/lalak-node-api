import { ProductSearchParams } from '@/features/product/domain/core/product-search-params';
import { Product } from '@/features/product/domain/core/product';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';

export abstract class ProductQueryRepository {
  abstract findAll(
    productSearchParams: ProductSearchParams,
  ): Promise<Product[]>;
  abstract paginate(
    productSearchParams: ProductSearchParams,
  ): Promise<ILengthAwarePaginator>;
  abstract findByUuid(uuid: string): Promise<Product | null>;
  abstract findByDescription(description: string): Promise<Product | null>;
  abstract findByProductUniqueName(uniqueName: string): Promise<Product | null>;
  abstract findByCategoryUuid(categoryUuid: string): Promise<Product[]>;
  abstract findByEventUuid(eventUuid: string): Promise<Product[]>;
}
