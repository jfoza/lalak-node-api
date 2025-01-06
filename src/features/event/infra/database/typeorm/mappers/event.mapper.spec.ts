import { UUID } from '@/utils/uuid';
import { EventMapper } from '@/features/event/infra/database/typeorm/mappers/event.mapper';
import { EventEntity } from '@/features/event/infra/database/typeorm/entities/event.entity';
import { Event } from '@/features/event/domain/entities/event';

describe('EventMapper Unit Tests', () => {
  let sut: EventMapper;

  const eventEntity: EventEntity = Object.assign({
    uuid: UUID.generate(),
    description: 'test',
    active: true,
    created_at: new Date(),
  } as EventEntity);

  beforeEach(async () => {
    sut = new EventMapper();
  });

  it('from method should return Event class instance', async () => {
    const result = await sut.from(eventEntity);

    expect(result).toBeInstanceOf(Event);
  });

  it('optional method should return Event class instance', async () => {
    const result = await sut.optional(eventEntity);

    expect(result).toBeInstanceOf(Event);
  });

  it('optional method should return null', async () => {
    const result = await sut.optional(undefined);

    expect(result).toBeNull();
  });

  it('collection method should return list Event class instance', async () => {
    const result: Event[] = await sut.collection([eventEntity]);

    expect(Array.isArray(result)).toBe(true);
    result.forEach((event) => {
      expect(event).toBeInstanceOf(Event);
    });
    expect(result.every((event) => event instanceof Event)).toBe(true);
  });

  it('toDomain method should return EventMapper class instance', async () => {
    const result = EventMapper.toDomain;

    expect(result).toBeInstanceOf(EventMapper);
  });

  it('toDomain from method should return Event class instance', async () => {
    const result = await EventMapper.toDomain.from(eventEntity);

    expect(result).toBeInstanceOf(Event);
  });

  it('toDomain optional method should return Event class instance', async () => {
    const result = await EventMapper.toDomain.optional(eventEntity);

    expect(result).toBeInstanceOf(Event);
  });

  it('toDomain optional method should return null', async () => {
    const result = await EventMapper.toDomain.optional(undefined);

    expect(result).toBeNull();
  });

  it('toDomain collection method should return Event class instance', async () => {
    const result: Event[] = await EventMapper.toDomain.collection([
      eventEntity,
    ]);

    expect(Array.isArray(result)).toBe(true);
    result.forEach((event) => {
      expect(event).toBeInstanceOf(Event);
    });
    expect(result.every((event) => event instanceof Event)).toBe(true);
  });
});
