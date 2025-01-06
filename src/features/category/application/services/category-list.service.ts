import { Application } from '@/common/application/application';
import { CategorySearchParamsDto } from '@/features/category/application/dto/category-search-params.dto';
import { Category } from '@/features/category/domain/entities/category';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { Inject, Injectable } from '@nestjs/common';
import { ICategoryListService } from '@/features/category/domain/services/category-list.service';
import { ICategoryListUseCase } from '@/features/category/domain/use-cases/category-list.use-case';

@Injectable()
export class CategoryListService
  extends Application
  implements ICategoryListService
{
  constructor(
    @Inject(ICategoryListUseCase)
    private readonly categoryListUseCase: ICategoryListUseCase,
  ) {
    super();
  }

  async handle(
    categorySearchParamsDto: CategorySearchParamsDto,
  ): Promise<Category[]> {
    this.policy.can(AbilitiesEnum.CATEGORIES_VIEW);

    return await this.categoryListUseCase.execute(categorySearchParamsDto);
  }
}
