import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { IAdminUserSearchParamsDto } from '@/features/user/domain/dto/admin-user-search-params.dto.interface';

export interface IAdminUserListUseCase {
  execute(
    adminUserSearchParamsDto: IAdminUserSearchParamsDto,
  ): Promise<ILengthAwarePaginator>;
}

export const IAdminUserListUseCase = Symbol('IAdminUserListUseCase');
