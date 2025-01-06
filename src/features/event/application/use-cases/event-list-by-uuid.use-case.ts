import { Event } from '@/features/event/domain/entities/event';
import { Application } from '@/common/application/application';
import { Inject, Injectable } from '@nestjs/common';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';
import { EventValidations } from '@/features/event/application/validations/event.validations';
import { IEventListByUuidUseCase } from '@/features/event/domain/use-cases/event-list-by-uuid.use-case';

@Injectable()
export class EventListByUuidUseCase
  extends Application
  implements IEventListByUuidUseCase
{
  constructor(
    @Inject(EventRepository)
    private readonly eventRepository: EventRepository,
  ) {
    super();
  }

  async execute(uuid: string): Promise<Event> {
    this.policy.can(AbilitiesEnum.EVENTS_VIEW);

    return await EventValidations.eventExists(uuid, this.eventRepository);
  }
}
