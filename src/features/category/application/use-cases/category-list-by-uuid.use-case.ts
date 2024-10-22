import { Application } from '@/common/application/use-cases/application';
import { Category } from '@/features/category/domain/core/category';
import { AbstractCategoryListByUuidUseCase } from '@/features/category/domain/use-cases/abstract.category-list-by-uuid.use-case';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { CategoryValidations } from '@/features/category/application/validations/category.validations';
import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';

@Injectable()
export class CategoryListByUuidUseCase
  extends Application
  implements AbstractCategoryListByUuidUseCase
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
