import { Application } from '@/common/application/application';
import { Event } from '@/features/event/domain/entities/event';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { Injectable } from '@nestjs/common';
import { EventSearchParamsDto } from '@/features/event/application/dto/event-search-params.dto';
import { IEventListUseCase } from '@/features/event/domain/use-cases/event-list.use-case';
import { IEventListService } from '@/features/event/domain/services/event-list.service';

@Injectable()
export class EventListService extends Application implements IEventListService {
  constructor(private readonly eventListUseCase: IEventListUseCase) {
    super();
  }

  async handle(eventSearchParamsDto: EventSearchParamsDto): Promise<Event[]> {
    this.policy.can(AbilitiesEnum.EVENTS_VIEW);

    return await this.eventListUseCase.execute(eventSearchParamsDto);
  }
}
