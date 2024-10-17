import { Ability } from '@/acl/domain/core/ability';

export interface IAclRepository {
  findAllByUserId(userUuid: string): Promise<Ability[]>;
  getUserAbilityDescriptions(userUuid: string): Promise<string[]>;
}
