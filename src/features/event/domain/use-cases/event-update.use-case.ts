import { Event } from '@/features/event/domain/entities/event';
import { IEventUpdateDto } from '@/features/event/domain/dto/event-update.dto';

export interface IEventUpdateUseCase {
  execute(uuid: string, eventUpdateDto: IEventUpdateDto): Promise<Event>;
}

export const IEventUpdateUseCase = Symbol('IEventUpdateUseCase');
