import { User } from '@/features/user/domain/entities/user';

export interface IAdminUserListByUuidUseCase {
  listUserForAdminMaster(uuid: string): Promise<User>;
  listUserForEmployee(uuid: string): Promise<User>;
}

export const IAdminUserListByUuidUseCase = Symbol(
  'IAdminUserListByUuidUseCase',
);
