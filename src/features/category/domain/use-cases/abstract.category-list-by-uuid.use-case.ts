import { Category } from '@/features/category/domain/core/category';

export abstract class AbstractCategoryListByUuidUseCase {
  abstract execute(uuid: string): Promise<Category>;
}
