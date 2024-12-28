import { IPaginationOrder } from '@/common/domain/dto/pagination-order.interface';

export class IAdminUserSearchParamsDto {
  name?: string;
  email?: string;
  profilesUniqueName: string[];
  paginationOrderParams: IPaginationOrder;
}
