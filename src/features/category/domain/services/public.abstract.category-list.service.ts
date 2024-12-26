import { CategorySearchParamsDto } from '@/features/category/application/dto/category-search-params.dto';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Category } from '@/features/category/domain/core/category';

export abstract class PublicAbstractCategoryListService {
  abstract handle(
    categorySearchParamsDto: CategorySearchParamsDto,
  ): Promise<ILengthAwarePaginator | Category[]>;
}
