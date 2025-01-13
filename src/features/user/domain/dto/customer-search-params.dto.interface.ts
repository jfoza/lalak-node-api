import { IPaginationOrder } from '@/common/domain/dto/pagination-order.interface';

export class ICustomerSearchParamsDto {
  name?: string;
  email?: string;
  paginationOrder: IPaginationOrder;
}
