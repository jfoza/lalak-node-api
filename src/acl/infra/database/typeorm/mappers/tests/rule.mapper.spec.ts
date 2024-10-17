import { UUID } from '@/common/infra/utils/uuid';
import { AbilityMapper } from '@/acl/infra/database/typeorm/mappers/ability.mapper';
import { AbilityEntity } from '@/acl/infra/database/typeorm/entities/ability.entity';
import { Ability } from '@/acl/domain/core/ability';

describe('AbilityMapper Unit Tests', () => {
  let sut: AbilityMapper;

  beforeEach(async () => {
    sut = new AbilityMapper();
  });

  it('toDomainEntity should return Ability class instance', async () => {
    const abilityEntity: AbilityEntity = Object.assign({
      uuid: UUID.generate(),
      description: 'TEST_VIEW',
      subject: 'TEST',
      action: 'VIEW',
      active: true,
    } as AbilityEntity);

    const result = await sut.from(abilityEntity);

    expect(result).toBeInstanceOf(Ability);
  });
});
