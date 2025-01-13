import { IAdminUserSearchParamsDto } from '@/features/user/domain/dto/admin-user-search-params.dto.interface';
import { User } from '@/features/user/domain/entities/user';

export interface IAdminUserListService {
  handle(adminUserSearchParamsDto: IAdminUserSearchParamsDto): Promise<User[]>;
}

export const IAdminUserListService = Symbol('IAdminUserListService');
