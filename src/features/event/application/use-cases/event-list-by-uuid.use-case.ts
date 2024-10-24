import { Event } from '@/features/event/domain/core/event';
import { Application } from '@/common/application/use-cases/application';
import { Injectable } from '@nestjs/common';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { AbstractEventListByUuidUseCase } from '@/features/event/domain/use-cases/abstract.event-list-by-uuid.use-case';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';
import { EventValidations } from '@/features/event/application/validations/event.validations';

@Injectable()
export class EventListByUuidUseCase
  extends Application
  implements AbstractEventListByUuidUseCase
{
  constructor(private readonly eventRepository: EventRepository) {
    super();
  }

  async execute(uuid: string): Promise<Event> {
    this.policy.can(AbilitiesEnum.EVENTS_VIEW);

    return await EventValidations.eventExists(uuid, this.eventRepository);
  }
}
