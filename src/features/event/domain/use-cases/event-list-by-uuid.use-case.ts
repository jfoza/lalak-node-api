import { Event } from '@/features/event/domain/entities/event';

export interface IEventListByUuidUseCase {
  execute(uuid: string): Promise<Event>;
}

export const IEventListByUuidUseCase = Symbol('IEventListByUuidUseCase');
