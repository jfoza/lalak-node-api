import { ProductSearchParamsDto } from '@/features/product/application/dto/product-search-params.dto';
import { Product } from '@/features/product/domain/entities/product';

export interface IProductListUseCase {
  execute(productSearchParamsDto: ProductSearchParamsDto): Promise<Product[]>;
}

export const IProductListUseCase = Symbol('IProductListUseCase');
