import { Application } from '@/common/application/use-cases/application';
import { Event } from '@/features/event/domain/core/event';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { Injectable } from '@nestjs/common';
import { AbstractEventListService } from '@/features/event/domain/services/abstract.event-list.service';
import { AbstractEventListUseCase } from '@/features/event/domain/use-cases/abstract.event-list.use-case';
import { EventSearchParamsDto } from '@/features/event/application/dto/event-search-params.dto';

@Injectable()
export class EventListService
  extends Application
  implements AbstractEventListService
{
  constructor(private readonly eventListUseCase: AbstractEventListUseCase) {
    super();
  }

  async handle(
    eventSearchParamsDto: EventSearchParamsDto,
  ): Promise<ILengthAwarePaginator | Event[]> {
    this.policy.can(AbilitiesEnum.EVENTS_VIEW);

    return await this.eventListUseCase.execute(eventSearchParamsDto);
  }
}
