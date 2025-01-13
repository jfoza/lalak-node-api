import { IAdminUserSearchParamsDto } from '@/features/user/domain/dto/admin-user-search-params.dto.interface';
import { User } from '@/features/user/domain/entities/user';

export interface IAdminUserListUseCase {
  listUserForAdminMaster(
    adminUserSearchParamsDto: IAdminUserSearchParamsDto,
  ): Promise<User[]>;

  listUserForEmployee(
    adminUserSearchParamsDto: IAdminUserSearchParamsDto,
  ): Promise<User[]>;
}

export const IAdminUserListUseCase = Symbol('IAdminUserListUseCase');
