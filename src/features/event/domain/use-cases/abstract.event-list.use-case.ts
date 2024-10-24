import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Event } from '@/features/event/domain/core/event';
import { EventSearchParamsDto } from '@/features/event/application/dto/event-search-params.dto';

export abstract class AbstractEventListUseCase {
  abstract execute(
    eventSearchParamsDto: EventSearchParamsDto,
  ): Promise<ILengthAwarePaginator | Event[]>;
}
