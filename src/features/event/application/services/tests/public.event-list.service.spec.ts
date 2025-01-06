import { beforeEach, vi } from 'vitest';
import { Event } from '@/features/event/domain/entities/event';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import { PublicEventListService } from '@/features/event/application/services/public.event-list.service';
import { EventSearchParamsDto } from '@/features/event/application/dto/event-search-params.dto';
import { IEventListUseCase } from '@/features/event/domain/use-cases/event-list.use-case';

describe('PublicEventListService Unit Tests', () => {
  let sut: PublicEventListService;
  let eventListUseCase: IEventListUseCase;
  let eventSearchParamsDto: EventSearchParamsDto;

  const events: Event[] = [ProductsDataBuilder.getEvent()];

  beforeEach(() => {
    eventListUseCase = {
      execute: vi.fn(async () => events),
    } as IEventListUseCase;

    sut = new PublicEventListService(eventListUseCase);

    eventSearchParamsDto = { description: '' } as EventSearchParamsDto;
  });

  it('Should return Should return a list of events', async () => {
    const result = await sut.handle(eventSearchParamsDto);

    if (Array.isArray(result)) {
      expect(Array.isArray(events)).toBe(true);

      result.forEach((event) => {
        expect(event).toBeInstanceOf(Event);
      });

      expect(result.every((event) => event instanceof Event)).toBe(true);
    }

    expect(eventListUseCase.execute).toHaveBeenCalled();
  });
});
