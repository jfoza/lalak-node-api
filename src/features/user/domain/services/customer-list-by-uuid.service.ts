import { Person } from '@/features/user/domain/entities/person';

export interface ICustomerListByUuidService {
  execute(userUuid: string): Promise<Person>;
}

export const ICustomerListByUuidService = Symbol('ICustomerListByUuidService');
