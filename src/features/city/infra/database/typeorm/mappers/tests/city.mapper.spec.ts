import { UUID } from '@/common/infra/utils/uuid';
import { CityMapper } from '@/features/city/infra/database/typeorm/mappers/city.mapper';
import { CityEntity } from '@/features/city/infra/database/typeorm/entities/city.entity';
import { City } from '@/features/city/domain/core/city';
import { BrazilianStates } from '@/common/infra/enums/brazilian-states.enum';

describe('CityMapper Unit Tests', () => {
  let sut: CityMapper;

  beforeEach(async () => {
    sut = new CityMapper();
  });

  it('toDomainEntity should return AdminUser class instance', async () => {
    const cityEntity: CityEntity = Object.assign({
      uuid: UUID.generate(),
      description: UUID.generate(),
      uf: BrazilianStates.RS,
      active: true,
    } as CityEntity);

    const result = await sut.from(cityEntity);

    expect(result).toBeInstanceOf(City);
  });
});
