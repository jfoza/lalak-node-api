import { Event } from '@/features/event/domain/entities/event';
import { Inject, Injectable } from '@nestjs/common';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';
import { EventSearchParamsDto } from '@/features/event/application/dto/event-search-params.dto';
import { IEventListUseCase } from '@/features/event/domain/use-cases/event-list.use-case';

@Injectable()
export class EventListUseCase implements IEventListUseCase {
  constructor(
    @Inject(EventRepository)
    private readonly eventRepository: EventRepository,
  ) {}

  async execute(eventSearchParamsDto: EventSearchParamsDto): Promise<Event[]> {
    return await this.eventRepository.findAll(eventSearchParamsDto);
  }
}
