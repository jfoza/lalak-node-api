import { Category } from '@/features/category/domain/core/category';
import { CreateCategoryDto } from '@/features/category/application/dto/create-category.dto';

export abstract class AbstractCategoryCreateUseCase {
  abstract execute(createCategoryDto: CreateCategoryDto): Promise<Category>;
}
