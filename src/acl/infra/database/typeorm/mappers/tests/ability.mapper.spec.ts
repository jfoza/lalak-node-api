import {
  TypeormAbilityMapper,
  TAbilityEntity,
} from '@/acl/infra/database/typeorm/mappers/typeorm-ability.mapper';
import { Ability } from '@/acl/domain/entities/ability';

describe('AbilityMapper Unit Tests', () => {
  let sut: TypeormAbilityMapper;

  const abilityEntity: TAbilityEntity = Object.assign({
    description: 'TEST_VIEW',
    subject: 'TEST',
    action: 'VIEW',
  } as TAbilityEntity);

  beforeEach(async () => {
    sut = new TypeormAbilityMapper();
  });

  it('from method should return Ability class instance', async () => {
    const result = await sut.from(abilityEntity);

    expect(result).toBeInstanceOf(Ability);
  });

  it('optional method should return Ability class instance', async () => {
    const result = await sut.optional(abilityEntity);

    expect(result).toBeInstanceOf(Ability);
  });

  it('optional method should return null', async () => {
    const result = await sut.optional(undefined);

    expect(result).toBeNull();
  });

  it('collection method should return list Ability class instance', async () => {
    const result = await sut.collection([abilityEntity]);

    expect(Array.isArray(result)).toBe(true);
    result.forEach((ability) => {
      expect(ability).toBeInstanceOf(Ability);
    });
    expect(result.every((ability) => ability instanceof Ability)).toBe(true);
  });

  it('toDomain method should return TypeormAbilityMapper class instance', async () => {
    const result = TypeormAbilityMapper.toDomain;

    expect(result).toBeInstanceOf(TypeormAbilityMapper);
  });

  it('toDomain from method should return Ability class instance', async () => {
    const result = await TypeormAbilityMapper.toDomain.from(abilityEntity);

    expect(result).toBeInstanceOf(Ability);
  });

  it('toDomain optional method should return AdminUser class instance', async () => {
    const result = await TypeormAbilityMapper.toDomain.optional(abilityEntity);

    expect(result).toBeInstanceOf(Ability);
  });

  it('toDomain optional method should return null', async () => {
    const result = await TypeormAbilityMapper.toDomain.optional(undefined);

    expect(result).toBeNull();
  });

  it('toDomain collection method should return Ability class instance', async () => {
    const result = await TypeormAbilityMapper.toDomain.collection([
      abilityEntity,
    ]);

    expect(Array.isArray(result)).toBe(true);
    result.forEach((ability) => {
      expect(ability).toBeInstanceOf(Ability);
    });
    expect(result.every((ability) => ability instanceof Ability)).toBe(true);
  });
});
