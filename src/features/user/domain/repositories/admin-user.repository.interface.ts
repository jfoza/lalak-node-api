import { User } from '@/features/user/domain/entities/user';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { AdminUser } from '@/features/user/domain/entities/admin-user';
import { IAdminUserSearchParamsDto } from '@/features/user/domain/dto/admin-user-search-params.dto.interface';

export interface IAdminUserRepository {
  paginate(
    adminUserSearchParamsDto: IAdminUserSearchParamsDto,
  ): Promise<ILengthAwarePaginator>;
  findByUserUuid(userUuid: string): Promise<User>;
  create(adminUser: AdminUser): Promise<AdminUser>;
}

export const IAdminUserRepository = Symbol('IAdminUserRepository');
