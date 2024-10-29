import { vi } from 'vitest';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { ProductListUseCase } from '@/features/product/application/use-cases/product-list.use-case';
import { ProductQueryRepository } from '@/features/product/domain/repositories/product-query.repository';
import { ProductSearchParamsDto } from '@/features/product/application/dto/product-search-params.dto';

describe('ProductListUseCase Unit Tests', () => {
  let sut: ProductListUseCase;
  let productQueryRepository: ProductQueryRepository;
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
    productQueryRepository = {
      findAll: vi.fn(),
      paginate: vi.fn(async () => lengthAwarePaginator),
    } as unknown as ProductQueryRepository;

    productSearchParamsDto = new ProductSearchParamsDto();

    sut = new ProductListUseCase(productQueryRepository);
  });

  it('Should return a paginated list of products', async () => {
    productSearchParamsDto.page = 1;
    productSearchParamsDto.perPage = 10;

    const result = await sut.execute(productSearchParamsDto);

    if (Array.isArray(result)) {
      throw new Error('Expected paginated result but received an array.');
    }

    expect(productQueryRepository.paginate).toHaveBeenCalled();
    expect(result.currentPage).toBe(lengthAwarePaginator.currentPage);
    expect(result.data).toBe(lengthAwarePaginator.data);
    expect(result.from).toBe(lengthAwarePaginator.from);
    expect(result.lastPage).toBe(lengthAwarePaginator.lastPage);
    expect(result.perPage).toBe(lengthAwarePaginator.perPage);
    expect(result.to).toBe(lengthAwarePaginator.to);
    expect(result.total).toBe(lengthAwarePaginator.total);
  });
});
