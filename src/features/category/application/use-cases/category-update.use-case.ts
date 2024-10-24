import { Application } from '@/common/application/use-cases/application';
import { Category } from '@/features/category/domain/core/category';
import { ThemeValidations } from '@/features/theme/application/validations/theme.validations';
import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';
import { ThemeRepository } from '@/features/theme/domain/repositories/theme.repository';
import { CategoryValidations } from '@/features/category/application/validations/category.validations';
import { AbstractCategoryUpdateUseCase } from '@/features/category/domain/use-cases/abstract.category-update.use-case';
import { UpdateCategoryDto } from '@/features/category/application/dto/update-category.dto';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';

@Injectable()
export class CategoryUpdateUseCase
  extends Application
  implements AbstractCategoryUpdateUseCase
{
  constructor(
    @Inject(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,

    @Inject(ThemeRepository)
    private readonly themeRepository: ThemeRepository,
  ) {
    super();
  }

  async execute(
    uuid: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    this.policy.can(AbilitiesEnum.CATEGORIES_UPDATE);

    const category = await CategoryValidations.categoryExists(
      uuid,
      this.categoryRepository,
    );

    const theme = await ThemeValidations.themeExists(
      updateCategoryDto.themeUuid,
      this.themeRepository,
    );

    await CategoryValidations.categoryExistsByNameInUpdate(
      category.uuid,
      updateCategoryDto.description,
      this.categoryRepository,
    );

    category.themeUuid = updateCategoryDto.themeUuid;
    category.theme = theme;
    category.description = updateCategoryDto.description;
    category.active = updateCategoryDto.active;

    await this.categoryRepository.update(category);

    return category;
  }
}
