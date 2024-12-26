import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { ProductSearchParamsDto } from '@/features/product/application/dto/product-search-params.dto';

export abstract class AbstractProductListService {
  abstract handle(
    productSearchParamsDto: ProductSearchParamsDto,
  ): Promise<ILengthAwarePaginator>;
}
