import { IPaginationOrder } from '@/common/domain/dto/pagination-order.interface';

export interface IEventSearchParamsDto {
  description?: string;
  paginationOrder?: IPaginationOrder;
}
