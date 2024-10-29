import { beforeEach, vi } from 'vitest';
import { PublicProductListService } from '@/features/product/application/services/public.product-list.service';
import { AbstractProductListUseCase } from '@/features/product/domain/use-cases/abstract.product-list.use-case';
import { ProductSearchParamsDto } from '@/features/product/application/dto/product-search-params.dto';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';

describe('PublicThemeListService Unit Tests', () => {
  let sut: PublicProductListService;
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

    sut = new PublicProductListService(productListUseCase);

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
});
