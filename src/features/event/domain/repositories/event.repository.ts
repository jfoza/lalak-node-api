import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { EventSearchParams } from '@/features/event/domain/core/event-search-params';
import { Event } from '@/features/event/domain/core/event';

export abstract class EventRepository {
  abstract findAll(eventSearchParams: EventSearchParams): Promise<Event[]>;
  abstract paginate(
    eventSearchParams: EventSearchParams,
  ): Promise<ILengthAwarePaginator>;
  abstract findByUuid(uuid: string): Promise<Event | null>;
  abstract findByUuids(uuids: string[]): Promise<Event[]>;
  abstract findByName(description: string): Promise<Event | null>;
  abstract create(event: Event): Promise<Event>;
  abstract update(event: Event): Promise<Event>;
  abstract remove(uuid: string): Promise<void>;
}
