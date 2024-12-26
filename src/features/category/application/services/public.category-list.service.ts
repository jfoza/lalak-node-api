import { CategorySearchParamsDto } from '@/features/category/application/dto/category-search-params.dto';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Category } from '@/features/category/domain/core/category';
import { PublicAbstractCategoryListService } from '@/features/category/domain/services/public.abstract.category-list.service';
import { AbstractCategoryListUseCase } from '@/features/category/domain/use-cases/abstract.category-list.use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PublicCategoryListService
  implements PublicAbstractCategoryListService
{
  constructor(
    private readonly categoryListUseCase: AbstractCategoryListUseCase,
  ) {}

  handle(
    categorySearchParamsDto: CategorySearchParamsDto,
  ): Promise<ILengthAwarePaginator | Category[]> {
    return this.categoryListUseCase.execute(categorySearchParamsDto);
  }
}
