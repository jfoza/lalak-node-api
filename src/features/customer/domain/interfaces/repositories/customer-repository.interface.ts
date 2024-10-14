import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { CustomerSearchParamsDto } from '@/features/customer/application/dto/customer-search-params.dto';
import { Customer } from '@/features/customer/domain/core/customer';
import { User } from '@/features/user/domain/core/user';

export interface ICustomerRepository {
  paginateResults(
    customerSearchParamsDto: CustomerSearchParamsDto,
  ): Promise<ILengthAwarePaginator>;
  findByUserUuid(userUuid: string): Promise<User>;
  create(customer: Customer): Promise<Customer>;
  update(customer: Customer): Promise<Customer>;
}
