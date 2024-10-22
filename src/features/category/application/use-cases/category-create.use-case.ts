import { Application } from '@/common/application/use-cases/application';
import { AbstractCategoryCreateUseCase } from '@/features/category/domain/use-cases/abstract.category-create.use-case';
import { CreateCategoryDto } from '@/features/category/application/dto/create-category.dto';
import {
  Category,
  CategoryProps,
} from '@/features/category/domain/core/category';
import { ThemeValidations } from '@/features/themes/application/validations/theme.validations';
import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';
import { ThemeRepository } from '@/features/themes/domain/repositories/theme.repository';
import { CategoryValidations } from '@/features/category/application/validations/category.validations';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';

@Injectable()
export class CategoryCreateUseCase
  extends Application
  implements AbstractCategoryCreateUseCase
{
  constructor(
    @Inject(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,

    @Inject(ThemeRepository)
    private readonly themeRepository: ThemeRepository,
  ) {
    super();
  }

  async execute(createCategoryDto: CreateCategoryDto): Promise<Category> {
    this.policy.can(AbilitiesEnum.CATEGORIES_INSERT);

    const theme = await ThemeValidations.themeExists(
      createCategoryDto.themeUuid,
      this.themeRepository,
    );

    await CategoryValidations.categoryExistsByName(
      createCategoryDto.description,
      this.categoryRepository,
    );

    const category = await Category.create({
      themeUuid: createCategoryDto.themeUuid,
      description: createCategoryDto.description,
      active: createCategoryDto.active,
      theme: theme,
    } as CategoryProps);

    await this.categoryRepository.create(category);

    return category;
  }
}
