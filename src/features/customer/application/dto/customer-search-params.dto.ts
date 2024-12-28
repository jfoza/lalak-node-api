import { ICustomerSearchParamsDto } from '@/features/customer/domain/dto/customer-search-params.dto.interface';
import { PaginationOrder } from '@/common/application/dto/pagination-order';

export class CustomerSearchParamsDto implements ICustomerSearchParamsDto {
  name?: string;
  email?: string;
  paginationOrder: PaginationOrder;

  constructor() {
    this.paginationOrder = new PaginationOrder();
  }
}

export const customerSearchParamsDto = new CustomerSearchParamsDto();
