import { UUID } from '@/common/infra/utils/uuid';
import { ThemeMapper } from '@/features/theme/infra/database/typeorm/mappers/theme.mapper';
import { ThemeEntity } from '@/features/theme/infra/database/typeorm/entities/theme.entity';
import { Theme } from '@/features/theme/domain/core/theme';

describe('ThemeMapper Unit Tests', () => {
  let sut: ThemeMapper;

  beforeEach(async () => {
    sut = new ThemeMapper();
  });

  it('toDomainEntity should return Theme class instance', async () => {
    const themeEntity: ThemeEntity = Object.assign({
      uuid: UUID.generate(),
      description: 'test',
      active: true,
      created_at: new Date(),
    } as ThemeEntity);

    const result = await sut.from(themeEntity);

    expect(result).toBeInstanceOf(Theme);
  });
});
