import { vi } from 'vitest';
import { Policy } from '@/acl/domain/core/policy';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import { UUID } from '@/common/infra/utils/uuid';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { ProductRemoveUseCase } from '@/features/product/application/use-cases/product-remove.use-case';
import { ProductQueryRepository } from '@/features/product/domain/repositories/product-query.repository';
import { ProductCommandRepository } from '@/features/product/domain/repositories/product-command.repository';
import { Product } from '@/features/product/domain/core/product';

describe('ProductRemoveUseCase Unit Tests', () => {
  let sut: ProductRemoveUseCase;
  let productQueryRepository: ProductQueryRepository;
  let productCommandRepository: ProductCommandRepository;

  beforeEach(() => {
    productQueryRepository = {
      findByUuid: vi.fn(),
    } as unknown as ProductQueryRepository;

    productCommandRepository = {
      remove: vi.fn(),
    } as unknown as ProductCommandRepository;

    sut = new ProductRemoveUseCase(
      productQueryRepository,
      productCommandRepository,
    );

    sut.policy = new Policy();

    sut.policy.abilities = [AbilitiesEnum.PRODUCTS_DELETE];
  });

  it('Should remove a unique Product', async () => {
    const product: Product = ProductsDataBuilder.getProduct();
    vi.spyOn(productQueryRepository, 'findByUuid').mockResolvedValue(product);

    await sut.execute(UUID.generate());

    expect(productQueryRepository.findByUuid).toHaveBeenCalled();
    expect(productCommandRepository.remove).toHaveBeenCalled();
  });

  it('Should return exception if Theme not exists', async () => {
    vi.spyOn(productQueryRepository, 'findByUuid').mockResolvedValue(null);

    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      NotFoundException,
    );
    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      ErrorMessagesEnum.PRODUCT_NOT_FOUND,
    );
  });

  it('Should return exception if user has not permission', async () => {
    sut.policy.abilities = ['ABC'];

    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
