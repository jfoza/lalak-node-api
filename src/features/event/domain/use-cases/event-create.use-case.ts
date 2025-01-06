import { Event } from '@/features/event/domain/entities/event';
import { IEventCreateDto } from '@/features/event/domain/dto/event-create.dto';

export interface IEventCreateUseCase {
  execute(eventCreateDto: IEventCreateDto): Promise<Event>;
}

export const IEventCreateUseCase = Symbol('IEventCreateUseCase');
