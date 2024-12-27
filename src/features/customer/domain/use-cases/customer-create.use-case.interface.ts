import { User } from '@/features/user/domain/entities/user';
import { ICreateCustomerDto } from '@/features/customer/domain/dto/create-customer.dto.interface';

export interface ICustomerCreateUseCase {
  execute(createCustomerDto: ICreateCustomerDto): Promise<User>;
}

export const ICustomerCreateUseCase = Symbol('ICustomerCreateUseCase');
