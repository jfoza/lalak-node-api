import { Application } from '@/common/application/use-cases/application';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { CategoryValidations } from '@/features/category/application/validations/category.validations';
import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';
import { AbstractCategoryRemoveUseCase } from '@/features/category/domain/use-cases/abstract.category-remove.use-case';

@Injectable()
export class CategoryRemoveUseCase
  extends Application
  implements AbstractCategoryRemoveUseCase
{
  constructor(
    @Inject(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,
  ) {
    super();
  }

  async execute(uuid: string): Promise<void> {
    this.policy.can(AbilitiesEnum.CATEGORIES_DELETE);

    const category = await CategoryValidations.categoryExists(
      uuid,
      this.categoryRepository,
    );

    await this.categoryRepository.remove(category.uuid);
  }
}
