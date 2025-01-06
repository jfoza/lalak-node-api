import { IAdminUserSearchParamsDto } from '@/features/user/domain/dto/admin-user-search-params.dto.interface';
import { Person } from '@/features/user/domain/entities/person';

export interface IAdminUserListUseCase {
  listUserForAdminMaster(
    adminUserSearchParamsDto: IAdminUserSearchParamsDto,
  ): Promise<Person[]>;

  listUserForEmployee(
    adminUserSearchParamsDto: IAdminUserSearchParamsDto,
  ): Promise<Person[]>;
}

export const IAdminUserListUseCase = Symbol('IAdminUserListUseCase');
