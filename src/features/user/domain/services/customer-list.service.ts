import { ICustomerSearchParamsDto } from '@/features/user/domain/dto/customer-search-params.dto.interface';
import { User } from '@/features/user/domain/entities/user';

export interface ICustomerListService {
  execute(customerSearchParamsDto: ICustomerSearchParamsDto): Promise<User[]>;
}

export const ICustomerListService = Symbol('ICustomerListService');
