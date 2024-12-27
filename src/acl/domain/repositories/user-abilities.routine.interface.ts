import { Ability } from '@/acl/domain/entities/ability';

export interface IUserAbilitiesRoutine {
  find(userUuid: string): Promise<Ability[]>;
}

export const IUserAbilitiesRoutine = Symbol('IUserAbilitiesRoutine');
