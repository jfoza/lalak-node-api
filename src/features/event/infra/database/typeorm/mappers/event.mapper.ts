import { Injectable } from '@nestjs/common';
import { EventEntity } from '@/features/event/infra/database/typeorm/entities/event.entity';
import { Event, EventProps } from '@/features/event/domain/entities/event';
import { Mapper } from '@/common/infra/database/typeorm/mappers/mapper';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

@Injectable()
export class EventMapper extends Mapper<EventEntity, Event> {
  static get toDomain(): EventMapper {
    return new this();
  }

  async from(raw: EventEntity): Promise<Event> {
    const props: EventProps = {
      description: raw.description,
      active: raw.active,
      createdAt: raw.created_at,
    };

    return Event.create(props, UniqueEntityId.create(raw.uuid));
  }
}
