import { User } from '@/features/user/domain/core/user';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { AdminUserSearchParamsDto } from '@/features/user/application/dto/admin-user-search-params.dto';
import { AdminUser } from '@/features/user/domain/core/admin-user';

export interface IAdminUserRepository {
  paginateResults(
    adminUserSearchParamsDto: AdminUserSearchParamsDto,
  ): Promise<ILengthAwarePaginator>;
  findByUserUuid(userUuid: string): Promise<User>;
  create(adminUser: AdminUser): Promise<AdminUser>;
}
