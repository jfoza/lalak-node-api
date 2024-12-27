import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { ICustomerSearchParamsDto } from '@/features/customer/domain/dto/customer-search-params.dto.interface';

export interface ICustomerListUseCase {
  execute(
    customerSearchParamsDto: ICustomerSearchParamsDto,
  ): Promise<ILengthAwarePaginator>;
}

export const ICustomerListUseCase = Symbol('ICustomerListUseCase');
