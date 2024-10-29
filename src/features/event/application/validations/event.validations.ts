import { ConflictException, NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { Event } from '@/features/event/domain/core/event';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';

export class EventValidations {
  static async eventExists(
    uuid: string,
    eventRepository: EventRepository,
  ): Promise<Event> {
    const event = await eventRepository.findByUuid(uuid);

    if (!event) {
      throw new NotFoundException(ErrorMessagesEnum.EVENT_NOT_FOUND);
    }

    return event;
  }

  static async eventsExists(
    eventsUuid: string[],
    eventRepository: EventRepository,
  ): Promise<Event[]> {
    const events: Event[] = await eventRepository.findByUuids(eventsUuid);

    const uuids: string[] = events.map((category: Event) => category.uuid);

    for (const eventUuid of eventsUuid) {
      if (!uuids.includes(eventUuid)) {
        throw new NotFoundException(ErrorMessagesEnum.EVENT_NOT_FOUND);
      }
    }

    return events;
  }

  static async eventExistsByName(
    name: string,
    eventRepository: EventRepository,
  ): Promise<void> {
    if (await eventRepository.findByName(name)) {
      throw new ConflictException(ErrorMessagesEnum.EVENT_NAME_ALREADY_EXISTS);
    }
  }

  static async eventExistsByNameInUpdate(
    uuid: string,
    name: string,
    eventRepository: EventRepository,
  ): Promise<void> {
    const event = await eventRepository.findByName(name);

    if (event && event.uuid !== uuid) {
      throw new ConflictException(ErrorMessagesEnum.EVENT_NAME_ALREADY_EXISTS);
    }
  }
}
