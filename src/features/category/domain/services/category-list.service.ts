import { CategorySearchParamsDto } from '@/features/category/application/dto/category-search-params.dto';
import { Category } from '@/features/category/domain/entities/category';

export interface ICategoryListService {
  handle(categorySearchParamsDto: CategorySearchParamsDto): Promise<Category[]>;
}

export const ICategoryListService = Symbol('ICategoryListService');
