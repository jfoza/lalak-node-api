import { Product } from '@/features/product/domain/entities/product';
import { IProductSearchParamsDto } from '@/features/product/domain/dto/product-search-params.dto';

export interface IPublicProductListService {
  handle(productSearchParamsDto: IProductSearchParamsDto): Promise<Product[]>;
}

export const IPublicProductListService = Symbol('IPublicProductListService');
