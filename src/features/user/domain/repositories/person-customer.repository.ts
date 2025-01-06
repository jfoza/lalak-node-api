import { Person } from '@/features/user/domain/entities/person';
import { ICustomerSearchParamsDto } from '@/features/user/domain/dto/customer-search-params.dto.interface';
import { PersonAuthUser } from '@/features/user/domain/entities/person-auth-user';

export interface PersonCustomerRepository {
  findAll(customerSearchParamsDto: ICustomerSearchParamsDto): Promise<Person[]>;
  findByUuid(uuid: string): Promise<Person>;
  findOneForLogin(email: string): Promise<PersonAuthUser>;
  create(person: Person): Promise<Person>;
  update(person: Person): Promise<Person>;
}

export const PersonCustomerRepository = Symbol('PersonCustomerRepository');
