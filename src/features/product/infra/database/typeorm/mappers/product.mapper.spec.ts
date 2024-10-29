import { UUID } from '@/common/infra/utils/uuid';
import { ProductMapper } from '@/features/product/infra/database/typeorm/mappers/product.mapper';
import { ProductEntity } from '@/features/product/infra/database/typeorm/entities/product.entity';
import { Product } from '@/features/product/domain/core/product';
import { CategoryEntity } from '@/features/category/infra/database/typeorm/entities/category.entity';
import { EventEntity } from '@/features/event/infra/database/typeorm/entities/event.entity';

describe('ProductMapper Unit Tests', () => {
  let sut: ProductMapper;

  beforeEach(async () => {
    sut = new ProductMapper();
  });

  it('toDomainEntity should return Product class instance', async () => {
    const productEntity: ProductEntity = Object.assign({
      uuid: UUID.generate(),
      description: 'test',
      details: 'test',
      unique_name: 'test',
      value: 0.0,
      quantity: 0,
      balance: 0,
      active: true,
      created_at: new Date(),
      updated_at: new Date(),
      categories: [
        Object.assign({
          uuid: UUID.generate(),
          theme_uuid: UUID.generate(),
          description: 'test',
          active: true,
          created_at: new Date(),
        } as CategoryEntity),
      ],
      events: [
        Object.assign({
          uuid: UUID.generate(),
          description: 'test',
          active: true,
          created_at: new Date(),
        } as EventEntity),
      ],
    } as ProductEntity);

    const result = await sut.from(productEntity);

    expect(result).toBeInstanceOf(Product);
  });
});
