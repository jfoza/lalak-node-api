import { Category } from '@/features/category/domain/entities/category';
import { ICategoryUpdateDto } from '@/features/category/domain/dto/category-update.dto';

export interface ICategoryUpdateUseCase {
  execute(
    uuid: string,
    categoryUpdateDto: ICategoryUpdateDto,
  ): Promise<Category>;
}

export const ICategoryUpdateUseCase = Symbol('ICategoryUpdateUseCase');
