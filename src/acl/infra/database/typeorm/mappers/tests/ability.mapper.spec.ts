import {
  AbilityMapper,
  TAbilityEntity,
} from '@/acl/infra/database/typeorm/mappers/ability.mapper';
import { Ability } from '@/acl/domain/entities/ability';

describe('AbilityMapper Unit Tests', () => {
  let sut: AbilityMapper;

  beforeEach(async () => {
    sut = new AbilityMapper();
  });

  it('toDomainEntity should return Ability class instance', async () => {
    const abilityEntity: TAbilityEntity = Object.assign({
      description: 'TEST_VIEW',
      subject: 'TEST',
      action: 'VIEW',
    } as TAbilityEntity);

    const result = await sut.from(abilityEntity);

    expect(result).toBeInstanceOf(Ability);
  });
});
