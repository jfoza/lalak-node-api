import { IProductSearchParamsDto } from '@/features/product/domain/dto/product-search-params.dto';
import { Product } from '@/features/product/domain/entities/product';

export interface IProductListService {
  handle(productSearchParamsDto: IProductSearchParamsDto): Promise<Product[]>;
}

export const IProductListService = Symbol('IProductListService');
