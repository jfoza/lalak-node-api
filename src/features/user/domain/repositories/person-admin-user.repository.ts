import { Person } from '@/features/user/domain/entities/person';
import { IAdminUserSearchParamsDto } from '@/features/user/domain/dto/admin-user-search-params.dto.interface';
import { PersonAuthUser } from '@/features/user/domain/entities/person-auth-user';

export interface PersonAdminUserRepository {
  findAll(
    adminUserSearchParamsDto: IAdminUserSearchParamsDto,
  ): Promise<Person[]>;
  findByUuid(uuid: string): Promise<Person>;
  findOneForLogin(email: string): Promise<PersonAuthUser>;
  create(person: Person): Promise<Person>;
  update(person: Person): Promise<Person>;
}

export const PersonAdminUserRepository = Symbol('PersonAdminUserRepository');
