import { User } from '@/features/user/domain/entities/user';

export interface ICustomerListByUuidService {
  execute(userUuid: string): Promise<User>;
}

export const ICustomerListByUuidService = Symbol('ICustomerListByUuidService');
