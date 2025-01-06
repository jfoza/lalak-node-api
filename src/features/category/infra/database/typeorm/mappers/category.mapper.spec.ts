import { UUID } from '@/utils/uuid';
import { CategoryMapper } from '@/features/category/infra/database/typeorm/mappers/category.mapper';
import { CategoryEntity } from '@/features/category/infra/database/typeorm/entities/category.entity';
import { Category } from '@/features/category/domain/entities/category';

describe('CategoryMapper Unit Tests', () => {
  let sut: CategoryMapper;

  const categoryEntity: CategoryEntity = Object.assign({
    uuid: UUID.generate(),
    theme_uuid: UUID.generate(),
    description: 'test',
    active: true,
    created_at: new Date(),
  } as CategoryEntity);

  beforeEach(async () => {
    sut = new CategoryMapper();
  });

  it('from method should return Category class instance', async () => {
    const result = await sut.from(categoryEntity);

    expect(result).toBeInstanceOf(Category);
  });

  it('optional method should return Category class instance', async () => {
    const result = await sut.optional(categoryEntity);

    expect(result).toBeInstanceOf(Category);
  });

  it('optional method should return null', async () => {
    const result = await sut.optional(undefined);

    expect(result).toBeNull();
  });

  it('collection method should return list Category class instance', async () => {
    const result: Category[] = await sut.collection([categoryEntity]);

    expect(Array.isArray(result)).toBe(true);
    result.forEach((category) => {
      expect(category).toBeInstanceOf(Category);
    });
    expect(result.every((category) => category instanceof Category)).toBe(true);
  });

  it('toDomain method should return CategoryMapper class instance', async () => {
    const result = CategoryMapper.toDomain;

    expect(result).toBeInstanceOf(CategoryMapper);
  });

  it('toDomain from method should return Category class instance', async () => {
    const result = await CategoryMapper.toDomain.from(categoryEntity);

    expect(result).toBeInstanceOf(Category);
  });

  it('toDomain optional method should return Category class instance', async () => {
    const result = await CategoryMapper.toDomain.optional(categoryEntity);

    expect(result).toBeInstanceOf(Category);
  });

  it('toDomain optional method should return null', async () => {
    const result = await CategoryMapper.toDomain.optional(undefined);

    expect(result).toBeNull();
  });

  it('toDomain collection method should return Category class instance', async () => {
    const result: Category[] = await CategoryMapper.toDomain.collection([
      categoryEntity,
    ]);

    expect(Array.isArray(result)).toBe(true);
    result.forEach((category) => {
      expect(category).toBeInstanceOf(Category);
    });
    expect(result.every((category) => category instanceof Category)).toBe(true);
  });
});
