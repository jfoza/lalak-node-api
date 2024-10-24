import { Application } from '@/common/application/use-cases/application';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { AbstractEventRemoveUseCase } from '@/features/event/domain/use-cases/abstract.event-remove.use-case';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';
import { EventValidations } from '@/features/event/application/validations/event.validations';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventRemoveUseCase
  extends Application
  implements AbstractEventRemoveUseCase
{
  constructor(private readonly eventRepository: EventRepository) {
    super();
  }

  async execute(uuid: string): Promise<void> {
    this.policy.can(AbilitiesEnum.EVENTS_DELETE);

    const event = await EventValidations.eventExists(
      uuid,
      this.eventRepository,
    );

    await this.eventRepository.remove(event.uuid);
  }
}
