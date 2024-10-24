import { Event, EventProps } from '@/features/event/domain/core/event';
import { Application } from '@/common/application/use-cases/application';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { Injectable } from '@nestjs/common';
import { AbstractEventCreateUseCase } from '@/features/event/domain/use-cases/abstract.event-create.use-case';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';
import { EventCreateDto } from '@/features/event/application/dto/event-create.dto';
import { EventValidations } from '@/features/event/application/validations/event.validations';

@Injectable()
export class EventCreateUseCase
  extends Application
  implements AbstractEventCreateUseCase
{
  constructor(private readonly eventRepository: EventRepository) {
    super();
  }

  async execute(eventCreateDto: EventCreateDto): Promise<Event> {
    this.policy.can(AbilitiesEnum.EVENTS_INSERT);

    await EventValidations.eventExistsByName(
      eventCreateDto.description,
      this.eventRepository,
    );

    const event = await Event.create({
      description: eventCreateDto.description,
      active: eventCreateDto.active,
    } as EventProps);

    await this.eventRepository.create(event);

    return event;
  }
}
