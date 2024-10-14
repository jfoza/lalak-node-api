import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { CustomerSearchParamsDto } from '@/features/customer/application/dto/customer-search-params.dto';

export interface ICustomerListUseCase {
  execute(
    customerSearchParamsDto: CustomerSearchParamsDto,
  ): Promise<ILengthAwarePaginator>;
}
