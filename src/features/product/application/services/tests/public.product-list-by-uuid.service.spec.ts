import { AbstractProductListByUuidUseCase } from '@/features/product/domain/use-cases/abstract.product-list-by-uuid.use-case';
import { vi } from 'vitest';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import { UUID } from '@/common/infra/utils/uuid';
import { Product } from '@/features/product/domain/core/product';
import { PublicProductListByUuidService } from '@/features/product/application/services/public.product-list-by-uuid.service';

describe('PublicProductListByUuidService', () => {
  let sut: PublicProductListByUuidService;
  let productListUseCase: AbstractProductListByUuidUseCase;

  beforeEach(() => {
    productListUseCase = {
      execute: vi.fn(async () => ProductsDataBuilder.getProduct()),
    } as unknown as AbstractProductListByUuidUseCase;

    sut = new PublicProductListByUuidService(productListUseCase);
  });

  it('Should return a unique Product', async () => {
    const result = await sut.handle(UUID.generate());

    expect(productListUseCase.execute).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Product);
  });
});
