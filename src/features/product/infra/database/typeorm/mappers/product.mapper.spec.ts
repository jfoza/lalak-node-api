import { UUID } from '@/utils/uuid';
import { ProductMapper } from '@/features/product/infra/database/typeorm/mappers/product.mapper';
import { ProductEntity } from '@/features/product/infra/database/typeorm/entities/product.entity';
import { Product } from '@/features/product/domain/entities/product';

describe('ProductMapper Unit Tests', () => {
  let sut: ProductMapper;

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
  } as ProductEntity);

  beforeEach(async () => {
    sut = new ProductMapper();
  });

  it('from method should return Product class instance', async () => {
    const result = await sut.from(productEntity);

    expect(result).toBeInstanceOf(Product);
  });

  it('optional method should return Product class instance', async () => {
    const result = await sut.optional(productEntity);

    expect(result).toBeInstanceOf(Product);
  });

  it('optional method should return null', async () => {
    const result = await sut.optional(undefined);

    expect(result).toBeNull();
  });

  it('collection method should return list Product class instance', async () => {
    const result: Product[] = await sut.collection([productEntity]);

    expect(Array.isArray(result)).toBe(true);
    result.forEach((product) => {
      expect(product).toBeInstanceOf(Product);
    });
    expect(result.every((product) => product instanceof Product)).toBe(true);
  });

  it('toDomain method should return ProductMapper class instance', async () => {
    const result = ProductMapper.toDomain;

    expect(result).toBeInstanceOf(ProductMapper);
  });

  it('toDomain from method should return Ability class instance', async () => {
    const result = await ProductMapper.toDomain.from(productEntity);

    expect(result).toBeInstanceOf(Product);
  });

  it('toDomain optional method should return AdminUser class instance', async () => {
    const result = await ProductMapper.toDomain.optional(productEntity);

    expect(result).toBeInstanceOf(Product);
  });

  it('toDomain optional method should return null', async () => {
    const result = await ProductMapper.toDomain.optional(undefined);

    expect(result).toBeNull();
  });

  it('toDomain collection method should return Ability class instance', async () => {
    const result: Product[] = await ProductMapper.toDomain.collection([
      productEntity,
    ]);

    expect(Array.isArray(result)).toBe(true);
    result.forEach((product) => {
      expect(product).toBeInstanceOf(Product);
    });
    expect(result.every((product) => product instanceof Product)).toBe(true);
  });
});
