import { Person } from '@/features/user/domain/entities/person';
import { ICustomerUpdateDto } from '@/features/user/domain/dto/customer-update.dto.interface';

export interface ICustomerUpdateService {
  execute(uuid: string, customerUpdateDto: ICustomerUpdateDto): Promise<Person>;
}

export const ICustomerUpdateService = Symbol('ICustomerUpdateService');
