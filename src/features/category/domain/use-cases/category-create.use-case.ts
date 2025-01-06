import { Category } from '@/features/category/domain/entities/category';
import { ICategoryCreateDto } from '@/features/category/domain/dto/category-create.dto';

export interface ICategoryCreateUseCase {
  execute(categoryCreateDto: ICategoryCreateDto): Promise<Category>;
}

export const ICategoryCreateUseCase = Symbol('ICategoryCreateUseCase');
