import { EventSearchParamsDto } from '@/features/event/application/dto/event-search-params.dto';
import { Event } from '@/features/event/domain/entities/event';

export interface IEventListService {
  handle(eventSearchParamsDto: EventSearchParamsDto): Promise<Event[]>;
}

export const IEventListService = Symbol('IEventListService');
