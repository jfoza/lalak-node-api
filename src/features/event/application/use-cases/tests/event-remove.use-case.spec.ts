import { vi } from 'vitest';
import { Policy } from '@/acl/domain/core/policy';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { Event } from '@/features/event/domain/core/event';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import { UUID } from '@/common/infra/utils/uuid';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { EventRemoveUseCase } from '@/features/event/application/use-cases/event-remove.use-case';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';

describe('EventRemoveUseCase Unit Tests', () => {
  let sut: EventRemoveUseCase;
  let eventRepository: EventRepository;

  beforeEach(() => {
    eventRepository = {
      findByUuid: vi.fn(),
      remove: vi.fn(),
    } as unknown as EventRepository;

    sut = new EventRemoveUseCase(eventRepository);

    sut.policy = new Policy();

    sut.policy.abilities = [AbilitiesEnum.EVENTS_DELETE];
  });

  it('Should remove a unique Event', async () => {
    const event: Event = ProductsDataBuilder.getEvent();
    vi.spyOn(eventRepository, 'findByUuid').mockResolvedValue(event);

    await sut.execute(UUID.generate());

    expect(eventRepository.findByUuid).toHaveBeenCalled();
    expect(eventRepository.remove).toHaveBeenCalled();
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

  it('Should return exception if the category has products', async () => {
    const event: Event = ProductsDataBuilder.getEvent();
    event.products = [ProductsDataBuilder.getProduct()];

    vi.spyOn(eventRepository, 'findByUuid').mockResolvedValue(event);

    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      BadRequestException,
    );
    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      ErrorMessagesEnum.EVENT_HAS_PRODUCTS_IN_DELETE,
    );
  });

  it('Should return exception if user has not permission', async () => {
    sut.policy.abilities = ['ABC'];

    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
