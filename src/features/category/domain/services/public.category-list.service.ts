import { CategorySearchParamsDto } from '@/features/category/application/dto/category-search-params.dto';
import { Category } from '@/features/category/domain/entities/category';

export interface IPublicCategoryListService {
  handle(categorySearchParamsDto: CategorySearchParamsDto): Promise<Category[]>;
}

export const IPublicCategoryListService = Symbol('IPublicCategoryListService');
