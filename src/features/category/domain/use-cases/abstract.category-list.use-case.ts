import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Category } from '@/features/category/domain/core/category';
import { CategorySearchParamsDto } from '@/features/category/application/dto/category-search-params.dto';

export abstract class AbstractCategoryListUseCase {
  abstract execute(
    categorySearchParamsDto: CategorySearchParamsDto,
  ): Promise<ILengthAwarePaginator | Category[]>;
}
