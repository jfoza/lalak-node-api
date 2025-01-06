import { IPaginationOrder } from '@/common/domain/dto/pagination-order.interface';

export interface IProductSearchParamsDto {
  description?: string;
  userUuid?: string;
  categories?: string[];
  events?: string[];
  active?: boolean;

  paginationOrder?: IPaginationOrder;
}
