import { vi } from 'vitest';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { Event } from '@/features/event/domain/entities/event';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import { UUID } from '@/utils/uuid';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { EventListByUuidUseCase } from '@/features/event/application/use-cases/event-list-by-uuid.use-case';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';
import { PolicyAdapter } from '@/acl/application/adapters/policy.adapter';
import { Policy } from '@/acl/domain/value-objects/policy';

describe('EventListByUuidUseCase Unit Tests', () => {
  let sut: EventListByUuidUseCase;
  let eventRepository: EventRepository;

  beforeEach(() => {
    eventRepository = {
      findByUuid: vi.fn(),
    } as unknown as EventRepository;

    sut = new EventListByUuidUseCase(eventRepository);

    sut.policy = new PolicyAdapter(Policy.create([AbilitiesEnum.EVENTS_VIEW]));
  });

  it('Should return a unique Event', async () => {
    const event: Event = ProductsDataBuilder.getEvent();
    vi.spyOn(eventRepository, 'findByUuid').mockResolvedValue(event);

    const result = await sut.execute(UUID.generate());

    expect(eventRepository.findByUuid).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Event);
  });

  it('Should return exception if Event not exists', async () => {
    vi.spyOn(eventRepository, 'findByUuid').mockResolvedValue(null);

    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      NotFoundException,
    );
    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      ErrorMessagesEnum.EVENT_NOT_FOUND,
    );
  });

  it('Should return exception if user has not permission', async () => {
    sut.policy = new PolicyAdapter(Policy.create());

    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
