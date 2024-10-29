import { vi } from 'vitest';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import { UUID } from '@/common/infra/utils/uuid';
import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { ProductListByUuidUseCase } from '@/features/product/application/use-cases/product-list-by-uuid.use-case';
import { ProductQueryRepository } from '@/features/product/domain/repositories/product-query.repository';
import { Product } from '@/features/product/domain/core/product';

describe('ProductListByUuidUseCase Unit Tests', () => {
  let sut: ProductListByUuidUseCase;
  let productQueryRepository: ProductQueryRepository;

  beforeEach(() => {
    productQueryRepository = {
      findByUuid: vi.fn(),
    } as unknown as ProductQueryRepository;

    sut = new ProductListByUuidUseCase(productQueryRepository);
  });

  it('Should return a unique Product', async () => {
    const product: Product = ProductsDataBuilder.getProduct();
    vi.spyOn(productQueryRepository, 'findByUuid').mockResolvedValue(product);

    const result = await sut.execute(UUID.generate());

    expect(productQueryRepository.findByUuid).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Product);
  });

  it('Should return exception if Product not exists', async () => {
    vi.spyOn(productQueryRepository, 'findByUuid').mockResolvedValue(null);

    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      NotFoundException,
    );
    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      ErrorMessagesEnum.PRODUCT_NOT_FOUND,
    );
  });
});
