import { ICustomerSearchParamsDto } from '@/features/user/domain/dto/customer-search-params.dto.interface';
import { PaginationOrder } from '@/common/application/dto/pagination-order';
import { IPaginationOrder } from '@/common/domain/dto/pagination-order.interface';

export class CustomerSearchParamsDto implements ICustomerSearchParamsDto {
  name?: string;
  email?: string;
  paginationOrder: IPaginationOrder;

  constructor() {
    this.paginationOrder = new PaginationOrder();
  }
}

export const customerSearchParamsDto = new CustomerSearchParamsDto();
