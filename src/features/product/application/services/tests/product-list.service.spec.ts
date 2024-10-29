import { beforeEach, vi } from 'vitest';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Policy } from '@/acl/domain/core/policy';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { ForbiddenException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { ProductListService } from '@/features/product/application/services/product-list.service';
import { AbstractProductListUseCase } from '@/features/product/domain/use-cases/abstract.product-list.use-case';
import { ProductSearchParamsDto } from '@/features/product/application/dto/product-search-params.dto';

describe('ProductListService Unit Tests', () => {
  let sut: ProductListService;
  let productListUseCase: AbstractProductListUseCase;
  let productSearchParamsDto: ProductSearchParamsDto;

  const lengthAwarePaginator: ILengthAwarePaginator = {
    currentPage: 1,
    data: [],
    from: 1,
    lastPage: 1,
    perPage: 1,
    to: 1,
    total: 1,
  };

  beforeEach(() => {
    productListUseCase = {
      execute: vi.fn(async () => lengthAwarePaginator),
    } as AbstractProductListUseCase;

    sut = new ProductListService(productListUseCase);
    sut.policy = new Policy();
    sut.policy.abilities = [AbilitiesEnum.PRODUCTS_VIEW];

    productSearchParamsDto = new ProductSearchParamsDto();
    productSearchParamsDto.page = 1;
    productSearchParamsDto.perPage = 10;
  });

  it('Should return Should return a paginated list of products', async () => {
    const result = await sut.handle(productSearchParamsDto);

    if (Array.isArray(result)) {
      throw new Error('Expected paginated result but received an array.');
    }

    expect(productListUseCase.execute).toHaveBeenCalled();
    expect(result.currentPage).toBe(lengthAwarePaginator.currentPage);
    expect(result.data).toBe(lengthAwarePaginator.data);
    expect(result.from).toBe(lengthAwarePaginator.from);
    expect(result.lastPage).toBe(lengthAwarePaginator.lastPage);
    expect(result.perPage).toBe(lengthAwarePaginator.perPage);
    expect(result.to).toBe(lengthAwarePaginator.to);
    expect(result.total).toBe(lengthAwarePaginator.total);
  });

  it('Should return exception if user has not permission', async () => {
    sut.policy.abilities = ['ABC'];

    await expect(sut.handle(productSearchParamsDto)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.handle(productSearchParamsDto)).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
