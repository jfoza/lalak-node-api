import { Mapper } from '@/common/infra/database/typeorm/mappers/Mapper';
import { Injectable } from '@nestjs/common';
import { EventEntity } from '@/features/event/infra/database/typeorm/entities/event.entity';
import { EventProps, Event } from '@/features/event/domain/core/event';

@Injectable()
export class EventMapper extends Mapper<EventEntity, Event, EventProps> {
  protected snakeCaseMapper: boolean = true;

  protected toDomainEntity(props: EventProps, uuid: string): Promise<Event> {
    return Event.create(props, uuid);
  }
}
