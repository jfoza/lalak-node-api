import { UUID } from '@/common/infra/utils/uuid';
import { PersonEntity } from '@/features/user/infra/database/typeorm/entities/person.entity';
import { PersonMapper } from '@/features/user/infra/database/typeorm/mappers/person.mapper';
import { Person } from '@/features/user/domain/core/person';
import { CityEntity } from '@/features/city/infra/database/typeorm/entities/city.entity';

describe('PersonMapper Unit Tests', () => {
  let sut: PersonMapper;

  beforeEach(async () => {
    sut = new PersonMapper();
  });

  it('toDomainEntity should return Person class instance', async () => {
    const person: PersonEntity = Object.assign({
      uuid: UUID.generate(),
      name: 'test',
      short_name: 'TE',
      birth_date: new Date(),
      zip_code: '00000000',
      address: 'test',
      number_address: '00',
      complement: 'test',
      district: 'test',
      uf: 'RS',
      city_uuid: UUID.generate(),
      active: true,
      created_at: new Date(),
    } as PersonEntity);

    const result = await sut.from(person);

    expect(result).toBeInstanceOf(Person);
  });

  it('toDomainEntity should return Person class instance with relations', async () => {
    const city: CityEntity = Object.assign({
      uuid: UUID.generate(),
      description: 'test',
      uf: 'RS',
      active: true,
    } as CityEntity);

    const person: PersonEntity = Object.assign({
      uuid: UUID.generate(),
      name: 'test',
      short_name: 'TE',
      birth_date: new Date(),
      zip_code: '00000000',
      address: 'test',
      number_address: '00',
      complement: 'test',
      district: 'test',
      uf: 'RS',
      city_uuid: UUID.generate(),
      active: true,
      created_at: new Date(),
      city,
    } as PersonEntity);

    const result = await sut.from(person);

    expect(result).toBeInstanceOf(Person);
  });
});
