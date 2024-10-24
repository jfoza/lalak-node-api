import { vi } from 'vitest';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Event } from '@/features/event/domain/core/event';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import { EventListUseCase } from '@/features/event/application/use-cases/event-list.use-case';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';
import { EventSearchParamsDto } from '@/features/event/application/dto/event-search-params.dto';

describe('EventListUseCase Unit Tests', () => {
  let sut: EventListUseCase;
  let eventRepository: EventRepository;
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
    eventRepository = {
      findAll: vi.fn(),
      paginate: vi.fn(async () => lengthAwarePaginator),
    } as unknown as EventRepository;

    eventSearchParamsDto = new EventSearchParamsDto();

    sut = new EventListUseCase(eventRepository);
  });

  it('Should return a paginated list of events', async () => {
    eventSearchParamsDto.page = 1;
    eventSearchParamsDto.perPage = 10;

    const result = await sut.execute(eventSearchParamsDto);

    if (Array.isArray(result)) {
      throw new Error('Expected paginated result but received an array.');
    }

    expect(eventRepository.paginate).toHaveBeenCalled();
    expect(result.currentPage).toBe(lengthAwarePaginator.currentPage);
    expect(result.data).toBe(lengthAwarePaginator.data);
    expect(result.from).toBe(lengthAwarePaginator.from);
    expect(result.lastPage).toBe(lengthAwarePaginator.lastPage);
    expect(result.perPage).toBe(lengthAwarePaginator.perPage);
    expect(result.to).toBe(lengthAwarePaginator.to);
    expect(result.total).toBe(lengthAwarePaginator.total);
  });

  it('Should return a list of events if no pagination params are provided', async () => {
    const eventsList: Event[] = [ProductsDataBuilder.getEvent()];
    vi.spyOn(eventRepository, 'findAll').mockResolvedValue(eventsList);

    const result = await sut.execute(eventSearchParamsDto);

    expect(eventRepository.findAll).toHaveBeenCalled();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(eventsList);
  });
});
