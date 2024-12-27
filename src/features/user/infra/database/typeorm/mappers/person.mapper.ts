import { PersonEntity } from '@/features/user/infra/database/typeorm/entities/person.entity';
import { Person, PersonProps } from '@/features/user/domain/entities/person';
import { Inject, Injectable } from '@nestjs/common';
import { Mapper } from '@/common/infra/database/typeorm/mappers/mapper';
import { CityMapper } from '@/features/city/infra/database/typeorm/mappers/city.mapper';

@Injectable()
export class PersonMapper extends Mapper<PersonEntity, Person> {
  constructor(
    @Inject(CityMapper)
    private readonly cityMapper: CityMapper,
  ) {
    super();
  }

  async from(ormEntity: PersonEntity): Promise<Person> {
    const props: PersonProps = {
      name: ormEntity.name,
      shortName: ormEntity.short_name,
      birthDate: ormEntity.birth_date,
      phone: ormEntity.phone,
      zipCode: ormEntity.zip_code,
      address: ormEntity.address,
      numberAddress: ormEntity.number_address,
      complement: ormEntity.complement,
      district: ormEntity.district,
      uf: ormEntity.uf,
      cityUuid: ormEntity.city_uuid,
      active: ormEntity.active,
      createdAt: ormEntity.created_at,
      city: ormEntity.city ? await this.cityMapper.from(ormEntity.city) : null,
    };

    return Person.create(props, ormEntity.uuid);
  }
}
