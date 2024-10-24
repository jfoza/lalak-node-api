import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Event } from '@/features/event/domain/core/event';
import { Injectable } from '@nestjs/common';
import { AbstractEventListUseCase } from '@/features/event/domain/use-cases/abstract.event-list.use-case';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';
import { EventSearchParamsDto } from '@/features/event/application/dto/event-search-params.dto';
import {
  EventSearchParams,
  EventSearchParamsProps,
} from '@/features/event/domain/core/event-search-params';

@Injectable()
export class EventListUseCase implements AbstractEventListUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(
    eventSearchParamsDto: EventSearchParamsDto,
  ): Promise<ILengthAwarePaginator | Event[]> {
    const { description, active, page, perPage, columnOrder, columnName } =
      eventSearchParamsDto;

    const eventSearchParams = EventSearchParams.create({
      description,
      active,
      columnOrder,
      columnName,
    } as EventSearchParamsProps);

    if (page) {
      eventSearchParams.page = page;
      eventSearchParams.perPage = perPage;

      return await this.eventRepository.paginate(eventSearchParams);
    }

    return await this.eventRepository.findAll(eventSearchParams);
  }
}
