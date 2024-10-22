import { Application } from '@/common/application/use-cases/application';
import { AbstractCategoryListService } from '@/features/category/domain/services/abstract.category-list.service';
import { CategorySearchParamsDto } from '@/features/category/application/dto/category-search-params.dto';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Category } from '@/features/category/domain/core/category';
import { AbstractCategoryListUseCase } from '@/features/category/domain/use-cases/abstract.category-list.use-case';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryListService
  extends Application
  implements AbstractCategoryListService
{
  constructor(
    private readonly categoryListUseCase: AbstractCategoryListUseCase,
  ) {
    super();
  }

  async handle(
    categorySearchParamsDto: CategorySearchParamsDto,
  ): Promise<ILengthAwarePaginator | Category[]> {
    this.policy.can(AbilitiesEnum.CATEGORIES_VIEW);

    return await this.categoryListUseCase.execute(categorySearchParamsDto);
  }
}
