import { Inject, Injectable } from '@nestjs/common';
import { EventSearchParamsDto } from '@/features/event/application/dto/event-search-params.dto';
import { Event } from '@/features/event/domain/entities/event';
import { IEventListUseCase } from '@/features/event/domain/use-cases/event-list.use-case';
import { IPublicEventListService } from '@/features/event/domain/services/public.event-list.service';

@Injectable()
export class PublicEventListService implements IPublicEventListService {
  constructor(
    @Inject(IEventListUseCase)
    private readonly eventListUseCase: IEventListUseCase,
  ) {}

  async handle(eventSearchParamsDto: EventSearchParamsDto): Promise<Event[]> {
    return await this.eventListUseCase.execute(eventSearchParamsDto);
  }
}
