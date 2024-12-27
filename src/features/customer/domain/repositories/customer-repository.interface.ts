import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Customer } from '@/features/customer/domain/entities/customer';
import { User } from '@/features/user/domain/entities/user';
import { ICustomerSearchParamsDto } from '@/features/customer/domain/dto/customer-search-params.dto.interface';

export interface ICustomerRepository {
  paginate(
    customerSearchParamsDto: ICustomerSearchParamsDto,
  ): Promise<ILengthAwarePaginator>;
  findByUserUuid(userUuid: string): Promise<User>;
  create(customer: Customer): Promise<Customer>;
  update(customer: Customer): Promise<Customer>;
}

export const ICustomerRepository = Symbol('ICustomerRepository');
