import { Injectable } from '@nestjs/common';
import { Person } from '@/features/user/domain/entities/person';
import { PersonAuthUser } from '@/features/user/domain/entities/person-auth-user';
import { PersonUserRepository } from '@/features/user/domain/repositories/person-user-repository';

@Injectable()
export class TypeormPersonUserRepository implements PersonUserRepository {
  findByEmail(email: string): Promise<Person | null> {
    return Promise.resolve(undefined);
  }

  findByUserLoggedByUuid(
    uuid: string,
    relation: string,
  ): Promise<PersonAuthUser | null> {
    return Promise.resolve(undefined);
  }

  findByUuid(uuid: string): Promise<Person | null> {
    return Promise.resolve(undefined);
  }

  updatePassword(uuid: string, newPassword: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  updateStatus(uuid: string, newStatus: boolean): Promise<void> {
    return Promise.resolve(undefined);
  }
}
