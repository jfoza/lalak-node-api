import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Injectable } from '@nestjs/common';
import { AbstractEventListUseCase } from '@/features/event/domain/use-cases/abstract.event-list.use-case';
import { EventSearchParamsDto } from '@/features/event/application/dto/event-search-params.dto';
import { Event } from '@/features/event/domain/core/event';
import { PublicAbstractEventListService } from '@/features/event/domain/services/public.abstract.event-list.service';

@Injectable()
export class PublicEventListService implements PublicAbstractEventListService {
  constructor(private readonly eventListUseCase: AbstractEventListUseCase) {}

  async handle(
    eventSearchParamsDto: EventSearchParamsDto,
  ): Promise<ILengthAwarePaginator | Event[]> {
    return await this.eventListUseCase.execute(eventSearchParamsDto);
  }
}
