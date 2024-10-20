import { IPersonRepository } from '@/features/user/domain/repositories/person-repository.interface';
import { Person } from '@/features/user/domain/core/person';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonEntity } from '@/features/user/infra/database/typeorm/entities/person.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeormPersonRepository implements IPersonRepository {
  @InjectRepository(PersonEntity)
  private readonly personEntityRepository: Repository<PersonEntity>;

  async create(person: Person): Promise<Person> {
    const personEntity: PersonEntity = this.personEntityRepository.create({
      uuid: person.uuid,
      name: person.name,
      short_name: person.shortName,
      birth_date: person.birthDate,
      zip_code: person.zipCode,
      address: person.address,
      number_address: person.numberAddress,
      complement: person.complement,
      district: person.district,
      uf: person.uf,
      city_uuid: person.cityUuid,
      created_at: person.createdAt,
    });

    await this.personEntityRepository.save(personEntity);

    return person;
  }

  async update(person: Person): Promise<Person> {
    await this.personEntityRepository.update(person.uuid, {
      name: person.name,
      short_name: person.shortName,
      birth_date: person.birthDate,
      zip_code: person.zipCode,
      address: person.address,
      number_address: person.numberAddress,
      complement: person.complement,
      district: person.district,
      uf: person.uf,
      city_uuid: person.cityUuid,
    });

    return person;
  }
}
