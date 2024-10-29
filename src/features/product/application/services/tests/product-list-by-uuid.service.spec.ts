import { ProductListByUuidService } from '@/features/product/application/services/product-list-by-uuid.service';
import { AbstractProductListByUuidUseCase } from '@/features/product/domain/use-cases/abstract.product-list-by-uuid.use-case';
import { vi } from 'vitest';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import { UUID } from '@/common/infra/utils/uuid';
import { Product } from '@/features/product/domain/core/product';
import { Policy } from '@/acl/domain/core/policy';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';

describe('ProductListByUuidService', () => {
  let sut: ProductListByUuidService;
  let productListUseCase: AbstractProductListByUuidUseCase;

  beforeEach(() => {
    productListUseCase = {
      execute: vi.fn(async () => ProductsDataBuilder.getProduct()),
    } as unknown as AbstractProductListByUuidUseCase;

    sut = new ProductListByUuidService(productListUseCase);
    sut.policy = new Policy();
    sut.policy.abilities = [AbilitiesEnum.PRODUCTS_VIEW];
  });

  it('Should return a unique Product', async () => {
    const result = await sut.handle(UUID.generate());

    expect(productListUseCase.execute).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Product);
  });
});
