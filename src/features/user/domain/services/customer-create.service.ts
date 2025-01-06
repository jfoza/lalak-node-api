import { ICustomerCreateDto } from '@/features/user/domain/dto/customer-create.dto.interface';
import { Person } from '@/features/user/domain/entities/person';

export interface ICustomerCreateService {
  execute(customerCreateDto: ICustomerCreateDto): Promise<Person>;
}

export const ICustomerCreateService = Symbol('ICustomerCreateService');
