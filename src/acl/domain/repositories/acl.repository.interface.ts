import { Ability } from '@/acl/domain/entities/ability';

export interface IAclRepository {
  findAllByUserUuid(userUuid: string): Promise<Ability[]>;
  findDescriptionByUserUuid(userUuid: string): Promise<string[]>;
}

export const IAclRepository = Symbol('IAclRepository');
