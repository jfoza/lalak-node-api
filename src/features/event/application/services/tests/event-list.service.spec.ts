import { beforeEach, vi } from 'vitest';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Policy } from '@/acl/domain/core/policy';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { ForbiddenException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { EventListService } from '@/features/event/application/services/event-list.service';
import { AbstractEventListUseCase } from '@/features/event/domain/use-cases/abstract.event-list.use-case';
import { EventSearchParamsDto } from '@/features/event/application/dto/event-search-params.dto';

describe('EventListService Unit Tests', () => {
  let sut: EventListService;
  let eventListUseCase: AbstractEventListUseCase;
  let eventSearchParamsDto: EventSearchParamsDto;

  const lengthAwarePaginator: ILengthAwarePaginator = {
    currentPage: 1,
    data: [],
    from: 1,
    lastPage: 1,
    perPage: 1,
    to: 1,
    total: 1,
  };

  beforeEach(() => {
    eventListUseCase = {
      execute: vi.fn(async () => lengthAwarePaginator),
    } as AbstractEventListUseCase;

    sut = new EventListService(eventListUseCase);
    sut.policy = new Policy();
    sut.policy.abilities = [AbilitiesEnum.EVENTS_VIEW];

    eventSearchParamsDto = new EventSearchParamsDto();
    eventSearchParamsDto.page = 1;
    eventSearchParamsDto.perPage = 10;
  });

  it('Should return Should return a paginated list of events', async () => {
    const result = await sut.handle(eventSearchParamsDto);

    if (Array.isArray(result)) {
      throw new Error('Expected paginated result but received an array.');
    }

    expect(eventListUseCase.execute).toHaveBeenCalled();
    expect(result.currentPage).toBe(lengthAwarePaginator.currentPage);
    expect(result.data).toBe(lengthAwarePaginator.data);
    expect(result.from).toBe(lengthAwarePaginator.from);
    expect(result.lastPage).toBe(lengthAwarePaginator.lastPage);
    expect(result.perPage).toBe(lengthAwarePaginator.perPage);
    expect(result.to).toBe(lengthAwarePaginator.to);
    expect(result.total).toBe(lengthAwarePaginator.total);
  });

  it('Should return exception if user has not permission', async () => {
    sut.policy.abilities = ['ABC'];

    await expect(sut.handle(eventSearchParamsDto)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.handle(eventSearchParamsDto)).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
