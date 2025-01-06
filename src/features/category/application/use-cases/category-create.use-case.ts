import { Application } from '@/common/application/application';
import {
  Category,
  CategoryProps,
} from '@/features/category/domain/entities/category';
import { ThemeValidations } from '@/features/theme/application/validations/theme.validations';
import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';
import { CategoryValidations } from '@/features/category/application/validations/category.validations';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { ICategoryCreateUseCase } from '@/features/category/domain/use-cases/category-create.use-case';
import { ThemeRepository } from '@/features/theme/domain/repositories/theme.repository.interface';
import { ICategoryCreateDto } from '@/features/category/domain/dto/category-create.dto';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

@Injectable()
export class CategoryCreateUseCase
  extends Application
  implements ICategoryCreateUseCase
{
  constructor(
    @Inject(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,

    @Inject(ThemeRepository)
    private readonly themeRepository: ThemeRepository,
  ) {
    super();
  }

  async execute(createCategoryDto: ICategoryCreateDto): Promise<Category> {
    this.policy.can(AbilitiesEnum.CATEGORIES_INSERT);

    const theme = await ThemeValidations.themeExists(
      createCategoryDto.themeUuid,
      this.themeRepository,
    );

    await CategoryValidations.categoryExistsByName(
      createCategoryDto.description,
      this.categoryRepository,
    );

    const category = Category.create({
      themeUuid: UniqueEntityId.create(createCategoryDto.themeUuid),
      description: createCategoryDto.description,
      active: createCategoryDto.active,
      theme: theme,
    } as CategoryProps);

    await this.categoryRepository.create(category);

    return category;
  }
}
