import { Event } from '@/features/event/domain/core/event';
import { EventCreateDto } from '@/features/event/application/dto/event-create.dto';

export abstract class AbstractEventCreateUseCase {
  abstract execute(eventCreateDto: EventCreateDto): Promise<Event>;
}
