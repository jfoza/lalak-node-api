import { Injectable } from '@nestjs/common';
import { PersonCustomerRepository } from '@/features/user/domain/repositories/person-customer.repository';
import { Person } from '@/features/user/domain/entities/person';
import { ICustomerSearchParamsDto } from '@/features/user/domain/dto/customer-search-params.dto.interface';
import { PersonAuthUser } from '@/features/user/domain/entities/person-auth-user';

@Injectable()
export class TypeormPersonCustomerRepository
  implements PersonCustomerRepository
{
  create(person: Person): Promise<Person> {
    return Promise.resolve(undefined);
  }

  findAll(
    customerSearchParamsDto: ICustomerSearchParamsDto,
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
