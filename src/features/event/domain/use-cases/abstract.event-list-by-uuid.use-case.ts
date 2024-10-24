import { Event } from '@/features/event/domain/core/event';

export abstract class AbstractEventListByUuidUseCase {
  abstract execute(uuid: string): Promise<Event>;
}
