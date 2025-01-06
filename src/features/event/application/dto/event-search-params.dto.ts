import { IEventSearchParamsDto } from '@/features/event/domain/dto/event-search-params.dto';
import { IPaginationOrder } from '@/common/domain/dto/pagination-order.interface';
import { PaginationOrder } from '@/common/application/dto/pagination-order';

export class EventSearchParamsDto implements IEventSearchParamsDto {
  description?: string;
  paginationOrder?: IPaginationOrder;

  constructor() {
    this.paginationOrder = new PaginationOrder();
  }
}

export const eventSearchParamsDto = new EventSearchParamsDto();
