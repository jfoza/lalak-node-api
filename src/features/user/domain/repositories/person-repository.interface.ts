import { Person } from '@/features/user/domain/core/person';

export interface IPersonRepository {
  create(person: Person): Promise<Person>;
  update(person: Person): Promise<Person>;
}
