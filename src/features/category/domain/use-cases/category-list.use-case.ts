import { Category } from '@/features/category/domain/entities/category';
import { CategorySearchParamsDto } from '@/features/category/application/dto/category-search-params.dto';

export interface ICategoryListUseCase {
  execute(
    categorySearchParamsDto: CategorySearchParamsDto,
  ): Promise<Category[]>;
}

export const ICategoryListUseCase = Symbol('ICategoryListUseCase');
