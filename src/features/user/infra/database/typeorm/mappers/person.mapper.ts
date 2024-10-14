import { Mapper } from '@/common/infra/database/typeorm/Mapper';
import { PersonEntity } from '@/features/user/infra/database/typeorm/entities/person.entity';
import { Person, PersonProps } from '@/features/user/domain/core/person';
import { Injectable } from '@nestjs/common';
import { City } from '@/features/city/domain/core/City';

@Injectable()
export class PersonMapper extends Mapper<PersonEntity, Person, PersonProps> {
  protected snakeCaseMapper: boolean = true;

  protected async toDomainEntity(
    props: PersonProps,
    uuid: string,
  ): Promise<Person> {
    props.city = props.city ? await City.create(props.city) : null;

    return Person.create(props, uuid);
  }
}
