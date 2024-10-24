import { UUID } from '@/common/infra/utils/uuid';
import { EventMapper } from '@/features/event/infra/database/typeorm/mappers/event.mapper';
import { EventEntity } from '@/features/event/infra/database/typeorm/entities/event.entity';
import { Event } from '@/features/event/domain/core/event';

describe('EventMapper Unit Tests', () => {
  let sut: EventMapper;

  beforeEach(async () => {
    sut = new EventMapper();
  });

  it('toDomainEntity should return Event class instance', async () => {
    const eventEntity: EventEntity = Object.assign({
      uuid: UUID.generate(),
      description: 'test',
      active: true,
      created_at: new Date(),
    } as EventEntity);

    const result = await sut.from(eventEntity);

    expect(result).toBeInstanceOf(Event);
  });
});
