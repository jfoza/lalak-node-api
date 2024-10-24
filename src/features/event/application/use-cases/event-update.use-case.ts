import { Event } from '@/features/event/domain/core/event';
import { Application } from '@/common/application/use-cases/application';
import { Injectable } from '@nestjs/common';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { AbstractEventUpdateUseCase } from '@/features/event/domain/use-cases/abstract.event-update.use-case';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';
import { EventUpdateDto } from '@/features/event/application/dto/event-update.dto';
import { EventValidations } from '@/features/event/application/validations/event.validations';

@Injectable()
export class EventUpdateUseCase
  extends Application
  implements AbstractEventUpdateUseCase
{
  constructor(private readonly eventRepository: EventRepository) {
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
