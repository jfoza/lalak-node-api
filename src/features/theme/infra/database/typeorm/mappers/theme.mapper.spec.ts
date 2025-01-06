import { UUID } from '@/utils/uuid';
import { ThemeMapper } from '@/features/theme/infra/database/typeorm/mappers/theme.mapper';
import { ThemeEntity } from '@/features/theme/infra/database/typeorm/entities/theme.entity';
import { Theme } from '@/features/theme/domain/entities/theme';

describe('ThemeMapper Unit Tests', () => {
  let sut: ThemeMapper;

  const themeEntity: ThemeEntity = Object.assign({
    uuid: UUID.generate(),
    description: 'test',
    active: true,
    created_at: new Date(),
  } as ThemeEntity);

  beforeEach(async () => {
    sut = new ThemeMapper();
  });

  it('from method should return Theme class instance', async () => {
    const result = await sut.from(themeEntity);

    expect(result).toBeInstanceOf(Theme);
  });

  it('optional method should return Theme class instance', async () => {
    const result = await sut.optional(themeEntity);

    expect(result).toBeInstanceOf(Theme);
  });

  it('optional method should return null', async () => {
    const result = await sut.optional(undefined);

    expect(result).toBeNull();
  });

  it('collection method should return list Theme class instance', async () => {
    const result: Theme[] = await sut.collection([themeEntity]);

    expect(Array.isArray(result)).toBe(true);
    result.forEach((theme) => {
      expect(theme).toBeInstanceOf(Theme);
    });
    expect(result.every((theme) => theme instanceof Theme)).toBe(true);
  });

  it('toDomain method should return ThemeMapper class instance', async () => {
    const result = ThemeMapper.toDomain;

    expect(result).toBeInstanceOf(ThemeMapper);
  });

  it('toDomain from method should return Ability class instance', async () => {
    const result = await ThemeMapper.toDomain.from(themeEntity);

    expect(result).toBeInstanceOf(Theme);
  });

  it('toDomain optional method should return AdminUser class instance', async () => {
    const result = await ThemeMapper.toDomain.optional(themeEntity);

    expect(result).toBeInstanceOf(Theme);
  });

  it('toDomain optional method should return null', async () => {
    const result = await ThemeMapper.toDomain.optional(undefined);

    expect(result).toBeNull();
  });

  it('toDomain collection method should return Ability class instance', async () => {
    const result: Theme[] = await ThemeMapper.toDomain.collection([
      themeEntity,
    ]);

    expect(Array.isArray(result)).toBe(true);
    result.forEach((theme) => {
      expect(theme).toBeInstanceOf(Theme);
    });
    expect(result.every((theme) => theme instanceof Theme)).toBe(true);
  });
});
