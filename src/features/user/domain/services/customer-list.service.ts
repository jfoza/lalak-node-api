import { ICustomerSearchParamsDto } from '@/features/user/domain/dto/customer-search-params.dto.interface';
import { Person } from '@/features/user/domain/entities/person';

export interface ICustomerListService {
  execute(customerSearchParamsDto: ICustomerSearchParamsDto): Promise<Person[]>;
}

export const ICustomerListService = Symbol('ICustomerListService');
