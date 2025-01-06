import { EventCreateDto } from '@/features/event/application/dto/event-create.dto';
import { IEventUpdateDto } from '@/features/event/domain/dto/event-update.dto';

export class EventUpdateDto extends EventCreateDto implements IEventUpdateDto {}
