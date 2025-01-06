import { PersonAdminUserRepository } from '@/features/user/domain/repositories/person-admin-user.repository';
import { Person } from '@/features/user/domain/entities/person';
import { IAdminUserSearchParamsDto } from '@/features/user/domain/dto/admin-user-search-params.dto.interface';
import { PersonAuthUser } from '@/features/user/domain/entities/person-auth-user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeormPersonAdminUserRepository
  implements PersonAdminUserRepository
{
  create(person: Person): Promise<Person> {
    return Promise.resolve(undefined);
  }

  findAll(
    adminUserSearchParamsDto: IAdminUserSearchParamsDto,
  ): Promise<Person[]> {
    return Promise.resolve([]);
  }

  findByUuid(uuid: string): Promise<Person> {
    return Promise.resolve(undefined);
  }

  findOneForLogin(email: string): Promise<PersonAuthUser> {
    return Promise.resolve(undefined);
  }

  update(person: Person): Promise<Person> {
    return Promise.resolve(undefined);
  }
}
