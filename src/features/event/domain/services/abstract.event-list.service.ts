import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { EventSearchParamsDto } from '@/features/event/application/dto/event-search-params.dto';
import { Event } from '@/features/event/domain/core/event';

export abstract class AbstractEventListService {
  abstract handle(
    eventSearchParamsDto: EventSearchParamsDto,
  ): Promise<ILengthAwarePaginator | Event[]>;
}
