import { Event } from '@/features/event/domain/entities/event';
import { EventSearchParamsDto } from '@/features/event/application/dto/event-search-params.dto';

export interface IPublicEventListService {
  handle(eventSearchParamsDto: EventSearchParamsDto): Promise<Event[]>;
}

export const IPublicEventListService = Symbol('IPublicEventListService');
