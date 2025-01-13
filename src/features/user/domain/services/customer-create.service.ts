import { ICustomerCreateDto } from '@/features/user/domain/dto/customer-create.dto.interface';
import { User } from '@/features/user/domain/entities/user';

export interface ICustomerCreateService {
  execute(customerCreateDto: ICustomerCreateDto): Promise<User>;
}

export const ICustomerCreateService = Symbol('ICustomerCreateService');
