import { CategorySearchParams } from '@/features/category/domain/core/category-search-params';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Category } from '@/features/category/domain/core/category';

export abstract class CategoryRepository {
  abstract findAll(
    categorySearchParams: CategorySearchParams,
  ): Promise<Category[]>;
  abstract paginate(
    categorySearchParams: CategorySearchParams,
  ): Promise<ILengthAwarePaginator>;
  abstract findByUuid(uuid: string): Promise<Category | null>;
  abstract findByName(description: string): Promise<Category | null>;
  abstract findByUuids(uuids: string[]): Promise<Category[]>;
  abstract findByThemeUuid(themeUuid: string): Promise<Category[]>;
  abstract create(category: Category): Promise<Category>;
  abstract update(category: Category): Promise<Category>;
  abstract remove(uuid: string): Promise<void>;
}
