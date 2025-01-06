import { Application } from '@/common/application/application';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';
import { EventValidations } from '@/features/event/application/validations/event.validations';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Event } from '@/features/event/domain/entities/event';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { IEventRemoveUseCase } from '@/features/event/domain/use-cases/event-remove.use-case';

@Injectable()
export class EventRemoveUseCase
  extends Application
  implements IEventRemoveUseCase
{
  constructor(
    @Inject(EventRepository)
    private readonly eventRepository: EventRepository,
  ) {
    super();
  }

  async execute(uuid: string): Promise<void> {
    this.policy.can(AbilitiesEnum.EVENTS_DELETE);

    const event: Event = await EventValidations.eventExists(
      uuid,
      this.eventRepository,
    );

    if (event.products.length > 0) {
      throw new BadRequestException(
        ErrorMessagesEnum.EVENT_HAS_PRODUCTS_IN_DELETE,
      );
    }

    await this.eventRepository.remove(event.uuid);
  }
}
