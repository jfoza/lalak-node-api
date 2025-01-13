import { UUID } from '@/utils/uuid';
import { TypeormCityMapper } from '@/features/city/infra/database/typeorm/mappers/typeorm.city.mapper';
import { CityEntity } from '@/features/city/infra/database/typeorm/entities/city.entity';
import { BrazilianStates } from '@/utils/enums/brazilian-states.enum';
import { City } from '@/features/city/domain/entities/city';

describe('CityMapper Unit Tests', () => {
  let sut: TypeormCityMapper;

  const cityEntity: CityEntity = Object.assign({
    uuid: UUID.generate(),
    description: UUID.generate(),
    uf: BrazilianStates.RS,
    active: true,
  } as CityEntity);

  beforeEach(async () => {
    sut = new TypeormCityMapper();
  });

  it('from method should return AdminUser class instance', async () => {
    const result = await sut.from(cityEntity);

    expect(result).toBeInstanceOf(City);
  });

  it('optional method should return AdminUser class instance', async () => {
    const result = await sut.optional(cityEntity);

    expect(result).toBeInstanceOf(City);
  });

  it('optional method should return null', async () => {
    const result = await sut.optional(undefined);

    expect(result).toBeNull();
  });

  it('collection method should return list City class instance', async () => {
    const result: City[] = await sut.collection([cityEntity]);

    expect(Array.isArray(result)).toBe(true);
    result.forEach((city) => {
      expect(city).toBeInstanceOf(City);
    });
    expect(result.every((city) => city instanceof City)).toBe(true);
  });

  it('toDomain method should return ThemeMapper class instance', async () => {
    const result = TypeormCityMapper.toDomain;

    expect(result).toBeInstanceOf(TypeormCityMapper);
  });

  it('toDomain from method should return Ability class instance', async () => {
    const result = await TypeormCityMapper.toDomain.from(cityEntity);

    expect(result).toBeInstanceOf(City);
  });

  it('toDomain optional method should return AdminUser class instance', async () => {
    const result = await TypeormCityMapper.toDomain.optional(cityEntity);

    expect(result).toBeInstanceOf(City);
  });

  it('toDomain optional method should return null', async () => {
    const result = await TypeormCityMapper.toDomain.optional(undefined);

    expect(result).toBeNull();
  });

  it('toDomain collection method should return Ability class instance', async () => {
    const result: City[] = await TypeormCityMapper.toDomain.collection([
      cityEntity,
    ]);

    expect(Array.isArray(result)).toBe(true);
    result.forEach((city) => {
      expect(city).toBeInstanceOf(City);
    });
    expect(result.every((city) => city instanceof City)).toBe(true);
  });
});
