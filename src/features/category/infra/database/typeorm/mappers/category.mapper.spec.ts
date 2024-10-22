import { UUID } from '@/common/infra/utils/uuid';
import { CategoryMapper } from '@/features/category/infra/database/typeorm/mappers/category.mapper';
import { CategoryEntity } from '@/features/category/infra/database/typeorm/entities/category.entity';
import { Category } from '@/features/category/domain/core/category';

describe('CategoryMapper Unit Tests', () => {
  let sut: CategoryMapper;

  beforeEach(async () => {
    sut = new CategoryMapper();
  });

  it('toDomainEntity should return Theme class instance', async () => {
    const categoryEntity: CategoryEntity = Object.assign({
      uuid: UUID.generate(),
      theme_uuid: UUID.generate(),
      description: 'test',
      active: true,
      created_at: new Date(),
    } as CategoryEntity);

    const result = await sut.from(categoryEntity);

    expect(result).toBeInstanceOf(Category);
  });
});
