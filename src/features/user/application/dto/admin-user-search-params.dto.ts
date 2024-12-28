import { IAdminUserSearchParamsDto } from '@/features/user/domain/dto/admin-user-search-params.dto.interface';
import { PaginationOrder } from '@/common/application/dto/pagination-order';

export class AdminUserSearchParamsDto implements IAdminUserSearchParamsDto {
  paginationOrderParams: PaginationOrder;
  name?: string;
  email?: string;
  profilesUniqueName: string[];

  constructor() {
    this.paginationOrderParams = new PaginationOrder();
  }
}

export const adminUserSearchParamsDto = new AdminUserSearchParamsDto();
