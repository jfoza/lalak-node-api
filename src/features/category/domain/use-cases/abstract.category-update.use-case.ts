import { Category } from '@/features/category/domain/core/category';
import { UpdateCategoryDto } from '@/features/category/application/dto/update-category.dto';

export abstract class AbstractCategoryUpdateUseCase {
  abstract execute(
    uuid: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category>;
}
