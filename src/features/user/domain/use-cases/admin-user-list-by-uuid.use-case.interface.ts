import { Person } from '@/features/user/domain/entities/person';

export interface IAdminUserListByUuidUseCase {
  listUserForAdminMaster(uuid: string): Promise<Person>;
  listUserForEmployee(uuid: string): Promise<Person>;
}

export const IAdminUserListByUuidUseCase = Symbol(
  'IAdminUserListByUuidUseCase',
);
