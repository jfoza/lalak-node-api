import { Application } from '@/common/application/application';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { CategoryValidations } from '@/features/category/application/validations/category.validations';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { Category } from '@/features/category/domain/entities/category';
import { ICategoryRemoveUseCase } from '@/features/category/domain/use-cases/category-remove.use-case';

@Injectable()
export class CategoryRemoveUseCase
  extends Application
  implements ICategoryRemoveUseCase
{
  constructor(
    @Inject(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,
  ) {
    super();
  }

  async execute(uuid: string): Promise<void> {
    this.policy.can(AbilitiesEnum.CATEGORIES_DELETE);

    const category: Category = await CategoryValidations.categoryExists(
      uuid,
      this.categoryRepository,
    );

    if (category.products.length > 0) {
      throw new BadRequestException(
        ErrorMessagesEnum.CATEGORY_HAS_PRODUCTS_IN_DELETE,
      );
    }

    await this.categoryRepository.remove(category.uuid);
  }
}
