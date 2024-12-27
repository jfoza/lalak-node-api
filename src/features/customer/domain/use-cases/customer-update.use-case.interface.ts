import { User } from '@/features/user/domain/entities/user';
import { IUpdateCustomerDto } from '@/features/customer/domain/dto/update-customer.dto.interface';

export interface ICustomerUpdateUseCase {
  execute(uuid: string, updateCustomerDto: IUpdateCustomerDto): Promise<User>;
}

export const ICustomerUpdateUseCase = Symbol('ICustomerUpdateUseCase');
