import { Category } from '@/features/category/domain/entities/category';
import { ICategorySearchParamsDto } from '@/features/category/domain/dto/category-search-params.dto';

export interface CategoryRepository {
  findAll(categorySearchParams: ICategorySearchParamsDto): Promise<Category[]>;
  // paginate(
  //   categorySearchParams: CategorySearchParams,
  // ): Promise<ILengthAwarePaginator>;
  findByUuid(uuid: string): Promise<Category | null>;
  findByName(description: string): Promise<Category | null>;
  findByUuids(uuids: string[]): Promise<Category[]>;
  findByThemeUuid(themeUuid: string): Promise<Category[]>;
  create(category: Category): Promise<Category>;
  update(category: Category): Promise<Category>;
  remove(uuid: string): Promise<void>;
}

export const CategoryRepository = Symbol('CategoryRepository');
