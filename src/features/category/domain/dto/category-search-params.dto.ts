import { IPaginationOrder } from '@/common/domain/dto/pagination-order.interface';

export interface ICategorySearchParamsDto {
  themeUuid?: string;
  description?: string;
  active?: boolean;
  paginationOrder: IPaginationOrder;
}
