import { PaginationOrder } from '@/common/application/dto/pagination-order';

export class ICustomerSearchParamsDto {
  name?: string;
  email?: string;
  paginationOrder: PaginationOrder;
}
