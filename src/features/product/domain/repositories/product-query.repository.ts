import { Product } from '@/features/product/domain/entities/product';
import { IProductSearchParamsDto } from '@/features/product/domain/dto/product-search-params.dto';

export interface ProductQueryRepository {
  findAll(productSearchParams: IProductSearchParamsDto): Promise<Product[]>;
  findByUuid(uuid: string): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  findByProductUniqueName(uniqueName: string): Promise<Product | null>;
  findByCategoryUuid(categoryUuid: string): Promise<Product[]>;
  findByEventUuid(eventUuid: string): Promise<Product[]>;
}

export const ProductQueryRepository = Symbol('ProductQueryRepository');
