import { IThemeSearchParamsDto } from '@/features/theme/domain/dto/theme-search-params.dto.interface';
import { PaginationOrder } from '@/common/application/dto/pagination-order';
import { IPaginationOrder } from '@/common/domain/dto/pagination-order.interface';

export class ThemeSearchParamsDto implements IThemeSearchParamsDto {
  description?: string | null;
  paginationOrder?: IPaginationOrder;

  constructor() {
    this.paginationOrder = new PaginationOrder();
  }
}

export const themeSearchParamsDto = new ThemeSearchParamsDto();
