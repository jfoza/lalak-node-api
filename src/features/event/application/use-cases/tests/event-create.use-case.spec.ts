import { beforeEach, vi } from 'vitest';
import { Policy } from '@/acl/domain/core/policy';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { Event } from '@/features/event/domain/core/event';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import { ConflictException, ForbiddenException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { EventCreateUseCase } from '@/features/event/application/use-cases/event-create.use-case';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';
import { EventCreateDto } from '@/features/event/application/dto/event-create.dto';

describe('EventCreateUseCase Unit Tests', () => {
  let sut: EventCreateUseCase;
  let eventRepository: EventRepository;
  let eventCreateDto: EventCreateDto;

  beforeEach(() => {
    eventRepository = {
      findByName: vi.fn(),
      create: vi.fn(),
    } as unknown as EventRepository;

    sut = new EventCreateUseCase(eventRepository);

    eventCreateDto = new EventCreateDto();
    eventCreateDto.description = 'test';
    eventCreateDto.active = true;

    sut.policy = new Policy();
    sut.policy.abilities = [AbilitiesEnum.EVENTS_INSERT];
  });

  it('Should create a event', async () => {
    const event: Event = ProductsDataBuilder.getEvent();

    vi.spyOn(eventRepository, 'findByName').mockResolvedValue(null);
    vi.spyOn(eventRepository, 'create').mockResolvedValue(event);

    const result = await sut.execute(eventCreateDto);

    expect(eventRepository.findByName).toHaveBeenCalled();
    expect(eventRepository.create).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Event);
  });

  it('Should return exception if event name already exists', async () => {
    const event: Event = ProductsDataBuilder.getEvent();

    vi.spyOn(eventRepository, 'findByName').mockResolvedValue(event);

    await expect(sut.execute(eventCreateDto)).rejects.toThrow(
      ConflictException,
    );
    await expect(sut.execute(eventCreateDto)).rejects.toThrow(
      ErrorMessagesEnum.EVENT_NAME_ALREADY_EXISTS,
    );
  });

  it('Should return exception if user has not permission', async () => {
    sut.policy.abilities = ['ABC'];

    await expect(sut.execute(eventCreateDto)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.execute(eventCreateDto)).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
