import { User } from '@/features/user/domain/entities/user';

export interface IAdminUserListByUuidService {
  handle(uuid: string): Promise<User>;
}

export const IAdminUserListByUuidService = Symbol(
  'IAdminUserListByUuidService',
);
