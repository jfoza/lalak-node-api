import { Application } from '@/common/application/application';
import { Category } from '@/features/category/domain/entities/category';
import { ThemeValidations } from '@/features/theme/application/validations/theme.validations';
import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';
import { CategoryValidations } from '@/features/category/application/validations/category.validations';
import { CategoryUpdateDto } from '@/features/category/application/dto/category-update.dto';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { ICategoryUpdateUseCase } from '@/features/category/domain/use-cases/category-update.use-case';
import { ThemeRepository } from '@/features/theme/domain/repositories/theme.repository.interface';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

@Injectable()
export class CategoryUpdateUseCase
  extends Application
  implements ICategoryUpdateUseCase
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
    updateCategoryDto: CategoryUpdateDto,
  ): Promise<Category> {
    this.policy.can(AbilitiesEnum.CATEGORIES_UPDATE);

    const category = await CategoryValidations.categoryExists(
      uuid,
      this.categoryRepository,
    );

    await ThemeValidations.themeExists(
      updateCategoryDto.themeUuid,
      this.themeRepository,
    );

    await CategoryValidations.categoryExistsByNameInUpdate(
      category.uuid,
      updateCategoryDto.description,
      this.categoryRepository,
    );

    category.themeUuid = UniqueEntityId.create(updateCategoryDto.themeUuid);
    category.description = updateCategoryDto.description;
    category.active = updateCategoryDto.active;

    await this.categoryRepository.update(category);

    return category;
  }
}
