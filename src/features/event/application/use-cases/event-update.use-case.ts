import { Event } from '@/features/event/domain/entities/event';
import { Application } from '@/common/application/application';
import { Inject, Injectable } from '@nestjs/common';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';
import { EventUpdateDto } from '@/features/event/application/dto/event-update.dto';
import { EventValidations } from '@/features/event/application/validations/event.validations';
import { IEventUpdateUseCase } from '@/features/event/domain/use-cases/event-update.use-case';

@Injectable()
export class EventUpdateUseCase
  extends Application
  implements IEventUpdateUseCase
{
  constructor(
    @Inject(EventRepository)
    private readonly eventRepository: EventRepository,
  ) {
    super();
  }

  async execute(uuid: string, eventUpdateDto: EventUpdateDto): Promise<Event> {
    this.policy.can(AbilitiesEnum.EVENTS_UPDATE);

    const event: Event = await EventValidations.eventExists(
      uuid,
      this.eventRepository,
    );

    await EventValidations.eventExistsByNameInUpdate(
      event.uuid,
      eventUpdateDto.description,
      this.eventRepository,
    );

    event.description = eventUpdateDto.description;
    event.active = eventUpdateDto.active;

    await this.eventRepository.update(event);

    return event;
  }
}
