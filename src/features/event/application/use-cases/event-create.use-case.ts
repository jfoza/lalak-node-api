import { Event, EventProps } from '@/features/event/domain/entities/event';
import { Application } from '@/common/application/application';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { Inject, Injectable } from '@nestjs/common';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';
import { EventCreateDto } from '@/features/event/application/dto/event-create.dto';
import { EventValidations } from '@/features/event/application/validations/event.validations';
import { IEventCreateUseCase } from '@/features/event/domain/use-cases/event-create.use-case';

@Injectable()
export class EventCreateUseCase
  extends Application
  implements IEventCreateUseCase
{
  constructor(
    @Inject(EventRepository)
    private readonly eventRepository: EventRepository,
  ) {
    super();
  }

  async execute(eventCreateDto: EventCreateDto): Promise<Event> {
    this.policy.can(AbilitiesEnum.EVENTS_INSERT);

    await EventValidations.eventExistsByName(
      eventCreateDto.description,
      this.eventRepository,
    );

    const event = Event.create({
      description: eventCreateDto.description,
      active: eventCreateDto.active,
    } as EventProps);

    await this.eventRepository.create(event);

    return event;
  }
}
