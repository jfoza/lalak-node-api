import { IPaginationOrder } from '@/common/domain/dto/pagination-order.interface';

export interface IThemeSearchParamsDto {
  description?: string | null;
  paginationOrder?: IPaginationOrder;
}
