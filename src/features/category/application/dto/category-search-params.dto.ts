import { ICategorySearchParamsDto } from '@/features/category/domain/dto/category-search-params.dto';
import { IPaginationOrder } from '@/common/domain/dto/pagination-order.interface';
import { PaginationOrder } from '@/common/application/dto/pagination-order';

export class CategorySearchParamsDto implements ICategorySearchParamsDto {
  themeUuid?: string;
  description?: string;
  active?: boolean;
  paginationOrder: IPaginationOrder;

  constructor() {
    this.paginationOrder = new PaginationOrder();
  }
}

export const categorySearchParamsDto = new CategorySearchParamsDto();
