import { beforeEach, vi } from 'vitest';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import { PublicCategoryListService } from '@/features/category/application/services/public.category-list.service';
import { CategorySearchParamsDto } from '@/features/category/application/dto/category-search-params.dto';
import { Category } from '@/features/category/domain/entities/category';
import { ICategoryListUseCase } from '@/features/category/domain/use-cases/category-list.use-case';

describe('PublicCategoryListService Unit Tests', () => {
  let sut: PublicCategoryListService;
  let categoryListUseCase: ICategoryListUseCase;
  let categorySearchParamsDto: CategorySearchParamsDto;

  const categories: Category[] = [ProductsDataBuilder.getCategory()];

  beforeEach(() => {
    categoryListUseCase = {
      execute: vi.fn(async () => categories),
    } as ICategoryListUseCase;

    sut = new PublicCategoryListService(categoryListUseCase);

    categorySearchParamsDto = { description: '' } as CategorySearchParamsDto;
  });

  it('Should return Should return a list of categories', async () => {
    const result = await sut.handle(categorySearchParamsDto);

    if (Array.isArray(result)) {
      expect(Array.isArray(categories)).toBe(true);

      result.forEach((category) => {
        expect(category).toBeInstanceOf(Category);
      });

      expect(result.every((category) => category instanceof Category)).toBe(
        true,
      );
    }

    expect(categoryListUseCase.execute).toHaveBeenCalled();
  });
});
