import { beforeEach, vi } from 'vitest';
import { Policy } from '@/acl/domain/core/policy';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { Event } from '@/features/event/domain/core/event';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { UUID } from '@/common/infra/utils/uuid';
import { EventUpdateUseCase } from '@/features/event/application/use-cases/event-update.use-case';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';
import { EventUpdateDto } from '@/features/event/application/dto/event-update.dto';

describe('EventUpdateUseCase Unit Tests', () => {
  let sut: EventUpdateUseCase;
  let eventRepository: EventRepository;
  let eventUpdateDto: EventUpdateDto;

  beforeEach(() => {
    eventRepository = {
      findByUuid: vi.fn(),
      findByName: vi.fn(),
      update: vi.fn(),
    } as unknown as EventRepository;

    sut = new EventUpdateUseCase(eventRepository);

    eventUpdateDto = new EventUpdateDto();
    eventUpdateDto.description = 'test';
    eventUpdateDto.active = true;

    sut.policy = new Policy();
    sut.policy.abilities = [AbilitiesEnum.EVENTS_UPDATE];
  });

  it('Should update a event', async () => {
    const event: Event = ProductsDataBuilder.getEvent();

    vi.spyOn(eventRepository, 'findByUuid').mockResolvedValue(event);
    vi.spyOn(eventRepository, 'findByName').mockResolvedValue(event);
    vi.spyOn(eventRepository, 'update').mockResolvedValue(event);

    const result = await sut.execute(UUID.generate(), eventUpdateDto);

    expect(eventRepository.findByUuid).toHaveBeenCalled();
    expect(eventRepository.findByName).toHaveBeenCalled();
    expect(eventRepository.update).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Event);
  });

  it('Should return exception if event uuid not exists', async () => {
    vi.spyOn(eventRepository, 'findByUuid').mockResolvedValue(null);

    await expect(sut.execute(UUID.generate(), eventUpdateDto)).rejects.toThrow(
      NotFoundException,
    );
    await expect(sut.execute(UUID.generate(), eventUpdateDto)).rejects.toThrow(
      ErrorMessagesEnum.EVENT_NOT_FOUND,
    );
  });

  it('Should return exception if event name already exists', async () => {
    const event1: Event = ProductsDataBuilder.getEvent();
    const event2: Event = ProductsDataBuilder.getEvent();

    vi.spyOn(eventRepository, 'findByUuid').mockResolvedValue(event1);
    vi.spyOn(eventRepository, 'findByName').mockResolvedValue(event2);

    await expect(sut.execute(UUID.generate(), eventUpdateDto)).rejects.toThrow(
      ConflictException,
    );
    await expect(sut.execute(UUID.generate(), eventUpdateDto)).rejects.toThrow(
      ErrorMessagesEnum.EVENT_NAME_ALREADY_EXISTS,
    );
  });

  it('Should return exception if user has not permission', async () => {
    sut.policy.abilities = ['ABC'];

    await expect(sut.execute(UUID.generate(), eventUpdateDto)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.execute(UUID.generate(), eventUpdateDto)).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
