import { IProductSearchParamsDto } from '@/features/product/domain/dto/product-search-params.dto';
import { IPaginationOrder } from '@/common/domain/dto/pagination-order.interface';
import { PaginationOrder } from '@/common/application/dto/pagination-order';

export class ProductSearchParamsDto implements IProductSearchParamsDto {
  description?: string;
  userUuid?: string;
  categories?: string[];
  events?: string[];
  active?: boolean;
  paginationOrder?: IPaginationOrder;

  constructor() {
    this.paginationOrder = new PaginationOrder();
  }
}

export const productSearchParamsDto = new ProductSearchParamsDto();
