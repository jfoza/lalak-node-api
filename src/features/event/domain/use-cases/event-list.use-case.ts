import { Event } from '@/features/event/domain/entities/event';
import { IEventSearchParamsDto } from '@/features/event/domain/dto/event-search-params.dto';

export interface IEventListUseCase {
  execute(eventSearchParamsDto: IEventSearchParamsDto): Promise<Event[]>;
}

export const IEventListUseCase = Symbol('IEventListUseCase');
