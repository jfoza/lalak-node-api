import { Event } from '@/features/event/domain/core/event';
import { EventUpdateDto } from '@/features/event/application/dto/event-update.dto';

export abstract class AbstractEventUpdateUseCase {
  abstract execute(
    uuid: string,
    eventUpdateDto: EventUpdateDto,
  ): Promise<Event>;
}
