import { Person } from '@/features/user/domain/entities/person';

export interface IAdminUserListByUuidService {
  handle(uuid: string): Promise<Person>;
}

export const IAdminUserListByUuidService = Symbol(
  'IAdminUserListByUuidService',
);
