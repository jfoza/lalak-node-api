import { Event } from '@/features/event/domain/entities/event';
import { IEventSearchParamsDto } from '@/features/event/domain/dto/event-search-params.dto';

export interface EventRepository {
  findAll(eventSearchParams: IEventSearchParamsDto): Promise<Event[]>;
  // abstract paginate(
  //   eventSearchParams: EventSearchParams,
  // ): Promise<ILengthAwarePaginator>;
  findByUuid(uuid: string): Promise<Event | null>;
  findByUuids(uuids: string[]): Promise<Event[]>;
  findByName(description: string): Promise<Event | null>;
  create(event: Event): Promise<Event>;
  update(event: Event): Promise<Event>;
  remove(uuid: string): Promise<void>;
}

export const EventRepository = Symbol('EventRepository');
