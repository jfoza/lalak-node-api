import { Person } from '@/features/user/domain/entities/person';
import { IAdminUserSearchParamsDto } from '@/features/user/domain/dto/admin-user-search-params.dto.interface';

export interface IAdminUserListService {
  handle(
    adminUserSearchParamsDto: IAdminUserSearchParamsDto,
  ): Promise<Person[]>;
}

export const IAdminUserListService = Symbol('IAdminUserListService');
