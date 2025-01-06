import { Category } from '@/features/category/domain/entities/category';

export interface ICategoryListByUuidUseCase {
  execute(uuid: string): Promise<Category>;
}

export const ICategoryListByUuidUseCase = Symbol('ICategoryListByUuidUseCase');
