import { ICustomerSearchParamsDto } from '@/features/user/domain/dto/customer-search-params.dto.interface';
import { User } from '@/features/user/domain/entities/user';

export interface CustomerRepository {
  findAll(customerSearchParamsDto: ICustomerSearchParamsDto): Promise<User[]>;
  findByUuid(uuid: string): Promise<User>;
  findOneForLogin(email: string): Promise<User>;
  create(person: User): Promise<User>;
  update(person: User): Promise<User>;
}

export const CustomerRepository = Symbol('CustomerRepository');
