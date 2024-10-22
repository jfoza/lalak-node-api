import { vi } from 'vitest';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import { CategoryListUseCase } from '@/features/category/application/use-cases/category-list.use-case';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';
import { CategorySearchParamsDto } from '@/features/category/application/dto/category-search-params.dto';
import { Category } from '@/features/category/domain/core/category';

describe('CategoryListUseCase Unit Tests', () => {
  let sut: CategoryListUseCase;
  let categoryRepository: CategoryRepository;
  let categorySearchParamsDto: CategorySearchParamsDto;

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
    categoryRepository = {
      findAll: vi.fn(),
      paginateResults: vi.fn(async () => lengthAwarePaginator),
    } as unknown as CategoryRepository;

    categorySearchParamsDto = new CategorySearchParamsDto();

    sut = new CategoryListUseCase(categoryRepository);
  });

  it('Should return a paginated list of categories', async () => {
    categorySearchParamsDto.page = 1;
    categorySearchParamsDto.perPage = 10;

    const result = await sut.execute(categorySearchParamsDto);

    if (Array.isArray(result)) {
      throw new Error('Expected paginated result but received an array.');
    }

    expect(categoryRepository.paginateResults).toHaveBeenCalled();
    expect(result.currentPage).toBe(lengthAwarePaginator.currentPage);
    expect(result.data).toBe(lengthAwarePaginator.data);
    expect(result.from).toBe(lengthAwarePaginator.from);
    expect(result.lastPage).toBe(lengthAwarePaginator.lastPage);
    expect(result.perPage).toBe(lengthAwarePaginator.perPage);
    expect(result.to).toBe(lengthAwarePaginator.to);
    expect(result.total).toBe(lengthAwarePaginator.total);
  });

  it('Should return a list of categories if no pagination params are provided', async () => {
    const categories: Category[] = [ProductsDataBuilder.getCategory()];
    vi.spyOn(categoryRepository, 'findAll').mockResolvedValue(categories);

    const result = await sut.execute(categorySearchParamsDto);

    expect(categoryRepository.findAll).toHaveBeenCalled();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(categories);
  });
});
