import { AdminUserSearchParamsDto } from '@/features/user/application/dto/admin-user-search-params.dto';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';

export interface IAdminUserListUseCase {
  execute(
    adminUserSearchParamsDto: AdminUserSearchParamsDto,
  ): Promise<ILengthAwarePaginator>;
}
