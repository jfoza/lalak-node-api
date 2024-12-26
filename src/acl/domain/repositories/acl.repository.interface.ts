import { Ability } from '@/acl/domain/entities/ability';

export interface IAclRepository {
  findAllByUserUuid(userUuid: string): Promise<Ability[]>;
}

export const IAclRepository = Symbol('IAclRepository');
