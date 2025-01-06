import { Person } from '@/features/user/domain/entities/person';
import { PersonAuthUser } from '@/features/user/domain/entities/person-auth-user';

export interface PersonUserRepository {
  findByUuid(uuid: string): Promise<Person | null>;
  findByUserLoggedByUuid(
    uuid: string,
    relation: string,
  ): Promise<PersonAuthUser | null>;
  findByEmail(email: string): Promise<Person | null>;
  findByEmailInLogin(email: string): Promise<PersonAuthUser | null>;
  updateStatus(uuid: string, newStatus: boolean): Promise<void>;
  updatePassword(uuid: string, newPassword: string): Promise<void>;
}

export const PersonUserRepository = Symbol('PersonUserRepository');
