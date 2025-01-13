import { ICustomerUpdateDto } from '@/features/user/domain/dto/customer-update.dto.interface';
import { User } from '@/features/user/domain/entities/user';

export interface ICustomerUpdateService {
  execute(uuid: string, customerUpdateDto: ICustomerUpdateDto): Promise<User>;
}

export const ICustomerUpdateService = Symbol('ICustomerUpdateService');
