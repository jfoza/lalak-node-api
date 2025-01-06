import { Application } from '@/common/application/application';
import { Category } from '@/features/category/domain/entities/category';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { CategoryValidations } from '@/features/category/application/validations/category.validations';
import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';
import { ICategoryListByUuidUseCase } from '@/features/category/domain/use-cases/category-list-by-uuid.use-case';

@Injectable()
export class CategoryListByUuidUseCase
  extends Application
  implements ICategoryListByUuidUseCase
{
  constructor(
    @Inject(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,
  ) {
    super();
  }

  async execute(uuid: string): Promise<Category> {
    this.policy.can(AbilitiesEnum.CATEGORIES_VIEW);

    return await CategoryValidations.categoryExists(
      uuid,
      this.categoryRepository,
    );
  }
}
