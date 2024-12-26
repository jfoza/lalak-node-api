import { User } from '@/features/user/domain/entities/user';

export interface IAdminUserListById {
  execute(userUuid: string): Promise<User>;
}

export const IAdminUserListById = Symbol('IAdminUserListById');
