import { Ability } from '@/acl/domain/entities/ability';

export interface IUserAbilities {
  find(userUuid: string): Promise<Ability[]>;
}

export const IUserAbilities = Symbol('IUserAbilities');
